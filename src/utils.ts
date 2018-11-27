/* eslint-disable */
import { MIN_WIDTH, SELECT_CELL_WIDTH } from './constant';
import {
	CurrentlyResizingProps,
	ColumnProps,
	ResizerData,
	RowSelection,
	CheckboxProps,
	ColumnsConfig,
} from './interface';

/**
 *
 * @param {*} item
 * 有关width minWidth maxWidth的
 * 1. 在styles中width
 * 2. 在column中的width
 * 3. 如果之传入width 根据MIN_WIDTH计算对应的flexItem
 */
function genItemResize<T>(item: ColumnProps<T>): ResizerData {
	const { styles = {}, width, maxWidth, minWidth } = item;
	const { flexItem } = styles;
	let usedFlexItem = flexItem;
	const usedWidth = styles.width || width || minWidth || styles.minWidth;
	// 若存在flexItem，以flexItem为主
	if (usedWidth && !usedFlexItem) {
		usedFlexItem = usedWidth / MIN_WIDTH;
	}
	let initWidthStyl = {
		key: item.key,
		minWidth: styles.minWidth || minWidth,
		maxWidth: styles.maxWidth || maxWidth,
		width: styles.width || width || minWidth || styles.minWidth,
		flexItem: usedFlexItem || 1,
	};
	return initWidthStyl;
}

export function genInitResize<T>({
	columns,
}: {
	columns: ColumnProps<T>[];
}): ResizerData[] {
	return columns.map(genItemResize);
}

export function genInitConfig<T>(
	columns: ColumnProps<T>[]
): {
	flatColumns: ColumnProps<T>[];
	resized: ResizerData[];
	columns: ColumnProps<T>[];
} {
	const flatColumns = getFlatColumns(columns);
	return {
		flatColumns,
		resized: genInitResize({ columns: flatColumns }),
		columns,
	};
}

/**
 *
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} getKey
 */
export function checkTwoArrIndexKeyEqual<T>(
	arr1: T[],
	arr2: T[],
	getKey: (item: T) => any
) {
	return !arr1.some((it1, index) => {
		const it2 = arr2[index];
		return getKey(it1) !== getKey(it2);
	});
}

function genNewConfigFromOld<T>(
	newColumn: ColumnProps<T>[],
	oldColumn: ColumnProps<T>[],
	oldResized: ResizerData[]
): ColumnsConfig<T> {
	const flatColumns = getFlatColumns(newColumn);
	const oldFlatColumns = getFlatColumns(oldColumn);
	const resized = flatColumns.map(item => {
		const oldItem = oldFlatColumns.find(oItem => oItem.key === item.key);
		if (oldItem) {
			const oldResizedItem = oldResized.find(it => it.key === item.key);
			if (oldResizedItem && oldResizedItem.value) {
				return oldResizedItem;
			}
		}
		return genItemResize(item);
	});
	return {
		flatColumns,
		resized,
		columns: newColumn,
	};
}

/**
 *
 * @param {*} newColumn
 * @param {*} oldColumn
 * return {
 *    columns,
 *    resized,
 *    flatColumns,
 * }
 */
export function genNewConfigByOld<T>({
	newColumn,
	oldColumn,
	oldResized,
}: {
	newColumn: ColumnProps<T>[];
	oldColumn: ColumnProps<T>[];
	oldResized: ResizerData[];
}) {
	if (newColumn !== oldColumn) {
		const flatColumns = getFlatColumns(newColumn);
		const oldFlatColumns = getFlatColumns(oldColumn);
		const newConfig = genInitConfig(newColumn);
		if (
			newColumn.length !== oldColumn.length ||
			flatColumns.length !== oldFlatColumns.length
		) {
			if (oldColumn.length === 0) {
				return genInitConfig(newColumn);
			} else {
				return genNewConfigFromOld(newColumn, oldColumn, oldResized);
			}
		} else {
			if (
				checkTwoArrIndexKeyEqual(newColumn, oldColumn, item => item.key)
			) {
				return {
					columns: newConfig.columns,
					flatColumns: newConfig.flatColumns,
					resized: oldResized, // TODO
				};
			}
			return genInitConfig(newColumn);
		}
	}
	return null;
}

export function getFlatColumns<T>(columns: ColumnProps<T>[]): ColumnProps<T>[] {
	const initArr: ColumnProps<T>[] = [];
	return columns.reduce((pre, cur) => {
		const { children } = cur;
		if (children) {
			return pre.concat(children);
		}
		return pre.concat([cur]);
	}, initArr);
}

function genResizeByFlatCol({
	currentlyResizing,
	newWidth,
	resized,
}: {
	currentlyResizing: CurrentlyResizingProps;
	newWidth: number;
	resized: ResizerData[];
}) {
	return resized.map(item => {
		if (item.key === currentlyResizing.key) {
			return {
				...item,
				value: newWidth,
			};
		}
		return item;
	});
}

function pxAdd(a, b) {
	return getNumWidth(a) + getNumWidth(b);
}

function genResizeFromCellGroup({ resize, averVal }) {
	const { value, maxWidth, minWidth, width } = resize;
	let usedKey = '';

	if (value) {
		usedKey = 'value';
	} else if (minWidth) {
		usedKey = 'minWidth';
	} else if (maxWidth) {
		usedKey = 'maxWidth';
	} else if (width) {
		usedKey = 'width';
	}
	// const curMinWidth = getMinWidthByResized(resize)
	// const calcVal = pxAdd(resize[usedKey] || curMinWidth, averVal);

	// if (calcVal > curMinWidth) {
	//     return {
	//         ...resize,
	//         value: genWidthVal(calcVal),
	//     };
	// }
	const calcVal = pxAdd(resize[usedKey] || MIN_WIDTH, averVal);
	if (calcVal > MIN_WIDTH) {
		return {
			...resize,
			value: genWidthVal(calcVal),
		};
	}
	return resize;
}

/**
 * 拖动mul col重新计算 子cell的宽度
 * 1. 子组件被拖动过 具有value属性
 * 2. 子组件未被拖动过 具有minWidth width maxWidth属性
 *
 * 关于被拉大宽度的分配：
 * 需求为平均分配， 这样我就需要真实的dom
 * @param {*} param0
 */
function genResizeByNestCol<T>({
	newWidth,
	resized,
	column,
}: {
	newWidth: number;
	resized: ResizerData[];
	column: ColumnProps<T>;
}) {
	const children = column.children;
	function checkIsChildResizeCb(item: ResizerData) {
		return children.find(child => item.key === child.key);
	}
	const subResized = resized.filter(checkIsChildResizeCb);
	const subResizedLen = subResized.length;
	const oldCellGroupStyl = getCellGroupStyl({
		siblingTitleArr: children,
		resized,
	});
	const oldWidth = oldCellGroupStyl.minWidth;
	const averVal = (newWidth - oldWidth) / subResizedLen;
	return resized.map(resize => {
		if (checkIsChildResizeCb(resize)) {
			return genResizeFromCellGroup({
				averVal,
				resize,
			});
		}
		return resize;
	});
}

/**
 *
 * @param {*} param0
 * 如果sibling的minWidth不存在 则 根据传入的flexItem和当前col的宽度 默认为当前的宽度
 *
 * 若存在sibling宽度不相等 则暂时传入的宽度 设置minWidth = maxWidth强制固定宽度
 *
 * fixd 不对齐bug： 传入的最小宽度100 缩小错位： 因为minWidth没别更改
 */
function genResizeWithSiblingCell<T>({
	currentlyResizing,
	newWidth,
	resized,
	pColumn,
}: {
	currentlyResizing: CurrentlyResizingProps;
	newWidth: number;
	resized: ResizerData[];
	pColumn: ColumnProps<T>;
}) {
	const pChildren = pColumn.children || [];
	if (pChildren.length === 0) {
		return;
	}
	const curResizd = resized.find(it => it.key === currentlyResizing.key);
	return resized.map(item => {
		const isSiblingCol = pChildren.find(it => it.key === item.key);
		if (curResizd === item) {
			return {
				...item,
				value: newWidth,
				minWidth: newWidth,
			};
		} else if (isSiblingCol) {
			const { value, minWidth, flexItem } = item;
			if (!value && !minWidth && curResizd) {
				const itemWidth = (flexItem / curResizd.flexItem) * newWidth;
				return {
					...item,
					value: itemWidth,
					minWidth: itemWidth,
				};
			}
		}
		// else if (isSiblingCol) {
		//     const { value, minWidth } = item;
		//     if (!value && !minWidth) {
		//         return {
		//             ...item,
		//             value: newWidth,
		//             minWidth: newWidth,
		//         };
		//     }
		// }
		return item;
	});
}

interface GenResizeParamsInter<T> {
	currentlyResizing: CurrentlyResizingProps;
	newWidth: number;
	resized: ResizerData[];
	pColumn: ColumnProps<T>;
	column: ColumnProps<T>;
}

export function genResize<T>({
	currentlyResizing,
	newWidth,
	resized,
	pColumn,
	column,
}: GenResizeParamsInter<T>) {
	const children = column.children;
	if (children && Array.isArray(children)) {
		return genResizeByNestCol({ newWidth, resized, column });
	} else if (isObject(pColumn)) {
		return genResizeWithSiblingCell({
			currentlyResizing,
			newWidth,
			resized,
			// column,
			pColumn,
		});
	}
	return genResizeByFlatCol({ currentlyResizing, newWidth, resized });
}

export function getNumWidth(width: string | number | any) {
	if (typeof width === 'string') {
		let useStr = width;
		if (width.indexOf('px') > -1) {
			return (useStr = width.slice(0, -2));
		}
		return Number(useStr);
	} else if (typeof width === 'number') {
		return width;
	} else {
		throw Error('type error! you should use number string as a ');
	}
}

function getCurLen(cur: ResizerData) {
	const { value, minWidth } = cur;
	if (value) {
		if (minWidth) {
			const minWidthNum = getNumWidth(minWidth);
			if (minWidthNum > value) {
				return minWidthNum;
			}
		}
		return value;
	}
}

/**
 * MIN_WIDTH根据传入的flexItem计算
 * @param {*} resized
 */
function getMinWidthByResized(resized: ResizerData) {
	return resized.flexItem * MIN_WIDTH;
}

export function getRowMinWidth<T>({
	resized,
	rowSelection,
}: {
	resized: ResizerData[];
	rowSelection: RowSelection<T>;
}) {
	const initWidth = rowSelection ? SELECT_CELL_WIDTH : 0;
	const rowMinWidth = resized.reduce((pre, cur) => {
		let curLen = getCurLen(cur);
		if (!curLen) {
			if (cur.minWidth) {
				curLen = getNumWidth(cur.minWidth);
			} else if (cur.width) {
				curLen = getNumWidth(cur.width);
			} else {
				curLen = getMinWidthByResized(cur);
			}
		}
		return accAdd(pre, curLen);
	}, initWidth);
	return rowMinWidth;
}

export function getCellWidthStyl({
	curResizedObj,
	styles,
}: {
	curResizedObj: ResizerData;
	styles: any;
}) {
	const { minWidth, ...restStyle } = styles;
	const { value, flexItem = 1, key, ...reSizedStyle } = curResizedObj;
	let usedstyles = {};
	if (curResizedObj.value) {
		usedstyles = {
			flex: `${curResizedObj.value} 0 auto`,
			width: curResizedObj.value,
			maxWidth: curResizedObj.value,
			minWidth: curResizedObj.value,
		};
	} else if (curResizedObj.flex) {
		usedstyles = {
			flex: curResizedObj.flex,
			width: curResizedObj.width,
			// width: curResizedObj.value,
			// maxWidth: curResizedObj.value,
		};
	} else if (curResizedObj.minWidth) {
		usedstyles = {
			minWidth: curResizedObj.minWidth,
			flex: `${curResizedObj.minWidth} 0 auto`,
		};
	} else if (curResizedObj.width) {
		usedstyles = {
			flex: flexItem,
			minWidth: curResizedObj.width,
		};
	} else {
		usedstyles = {
			flex: flexItem,
			minWidth: getMinWidthByResized(curResizedObj),
		};
	}
	return { ...restStyle, ...reSizedStyle, ...usedstyles };
}

export function getCellGroupStyl<T>({
	siblingTitleArr,
	resized,
}: {
	siblingTitleArr: ColumnProps<T>[];
	resized: ResizerData[];
}) {
	const siblingResize = resized.filter(item =>
		siblingTitleArr.find(it => it.key === item.key)
	);
	const childHasFlexStyleFlag = siblingResize.some(it => !!it.value);
	let usedstyles = {};
	if (childHasFlexStyleFlag) {
		const width = siblingResize.reduce((pre, cur) => {
			let useVal = getMinWidthByResized(cur);
			if (cur.value) {
				useVal = cur.value;
			} else if (cur.minWidth) {
				useVal = cur.minWidth as number;
			}
			return pre + useVal;
		}, 0);
		usedstyles = {
			flex: `${width} 0 auto`,
			minWidth: width,
			maxWidth: width,
			width,
		};
	} else {
		const minWidth = siblingResize.reduce((pre, cur) => {
			const value =
				cur.minWidth || cur.width || getMinWidthByResized(cur);
			return pre + parseInt(value + '', 10);
		}, 0);
		usedstyles = {
			flex: siblingResize.reduce((pre, cur) => pre + cur.flexItem, 0),
			minWidth,
		};
	}
	return usedstyles;
}

/**
 *
 * @param {*} value 整数。。。
 */
export function genWidthVal(value: number): number {
	return Math.round(value);
}

export function getKey<T>(
	data: T,
	rowKey: string | ((record: T, index?: number) => string)
) {
	if (typeof rowKey === 'function') {
		return rowKey(data);
	}
	return (data as any)[rowKey as string];
}

/**
 *
 * @param {*} param0
 * 获取能被勾选的 嵌套的CheckBox key
 */
export function getCanCheckAllNestKeys<T>({
	dataSource,
	childrenName,
	rowKey,
	getCheckboxProps,
}: {
	dataSource: T[];
	childrenName?: string;
	rowKey: string | ((record: T, index: number) => string);
	getCheckboxProps?: (record: T) => CheckboxProps;
}) {
	const filterCb = (it: T) =>
		getCheckboxProps ? !(getCheckboxProps(it) || {}).disabled : true;
	let arr: string[] = [];
	const loop = (data: T[]) => {
		data.forEach(item => {
			if (filterCb && filterCb(item)) {
				arr.push(getKey(item, rowKey));
			} else {
				// arr.push(rowKey(item));
			}
			if (Array.isArray((item as any)[childrenName])) {
				loop((item as any)[childrenName]);
			}
		});
	};
	loop(dataSource);
	return arr;
}

function checkColumnsHasWidth(column) {
	return (
		column.width ||
		(column.styles && (column.styles.width || column.styles.maxWidth))
	);
}

/**
 * 渲染成功之后微调样式 针对于多表头
 * @param {} rowDom
 * @param {*} config
 */
export function adjustResized(rowDom, config = {}) {
	const { flatColumns, columns, resized } = config;
	if (columns.length === flatColumns.length) {
		return null;
	}
	const childList = [...rowDom.childNodes].filter(
		it => it.className.indexOf('yc-tbody-row-select-cell') === -1
	);
	return resized.map((it, index) => {
		if (
			!checkColumnsHasWidth(flatColumns[index]) &&
			childList[index].clientWidth
		) {
			return {
				...it,
				value: parseInt(childList[index].clientWidth),
			};
		}
		return it;
	});
}

/**
 * @param {*} arr
 * @param {*} ele
 */
export function isLastChild(arr: any[], ele: any): boolean {
	const arrLen = arr.length;
	return arrLen - 1 === arr.findIndex(it => it === ele);
}

export function isObject(value: any): boolean {
	const type = typeof value;
	return value != null && (type === 'object' || type === 'function');
}

/**
 *
 * @param {number} num1
 * @param {number} num2
 */
function preAcc(num1: number, num2: number): number {
	const r1 = getDecimalLen(num1);
	const r2 = getDecimalLen(num2);
	return Math.pow(10, Math.max(r1, r2));
}

export function accAdd(num1: number, num2: number): number {
	const m = preAcc(num1, num2);
	return Math.round(num1 * m + num2 * m) / m;
}

export function accReduce(num1: number, num2: number): number {
	const m = preAcc(num1, num2);
	return Math.round(num1 * m - num2 * m) / m;
}

/**
 *
 * @param {*} num
 */
function getDecimalLen(num: number): number {
	let len;
	try {
		len = num.toString().split('.')[1].length;
	} catch (error) {
		len = 0;
	}
	return len;
}
