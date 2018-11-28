import * as React from 'react';
import { Icon, Checkbox, Radio } from 'antd';
import { getCellWidthStyl, getCanCheckAllNestKeys, getKey } from '../../utils';
import { SELECT_CELL_WIDTH } from '../../constant';
import {
	RowCellWarpProps,
	TbodySelectCellProps,
	RowCellProps,
	CommonCellProps,
	RowCellItemProps,
	RowMulCellProps,
    ExpendedCellProps,
    ExpendIconProps,
} from '../../interface';

function ExpendIcon<T, K>(props: ExpendIconProps<T, K>) {
	const {
		itemData,
		rowKey,
		indexLevel,
		expandedKeys,
		handleExpend,
		childrenName = '',
    } = props;
    const childrenData = (itemData as any)[childrenName]
	if (Array.isArray(childrenData)) {
		const itemKey = getKey(itemData, rowKey);
		return (
			<span
				style={{
					cursor: 'pointer',
					marginLeft: (Number(indexLevel) - 1) * 10,
				}}
				onClick={() => {
					handleExpend(itemKey, itemData);
				}}
			>
				{expandedKeys.indexOf(itemKey) === -1 ? (
					<Icon type="caret-right" />
				) : (
					<Icon type="caret-down" />
				)}
			</span>
		);
	}
	return (
		<span
			style={{
				cursor: 'pointer',
				width: 12,
				display: 'inline-block',
				marginLeft: (Number(indexLevel) - 1) * 15,
			}}
		/>
	);
}

/**
 * data以itemData为准；因为CHILD属性
 * @param {*} props
 */
function RowMulCell<T>(props: RowMulCellProps<T>) {
	const { itemData, mulCellKey = '', useStyles, rowIndex, column } = props;
	const { render, dataIndex } = column;
	const childrenData: any[] = (itemData as any)[mulCellKey];
	return (
		<div style={useStyles} className="yc-tbody-row-cell">
			{childrenData &&
				childrenData.length > 0 &&
				childrenData.map((child, index) => (
					<div key={index} className="yc-tbody-row-cell-line">
						{render
							? render(
									{
										...child,
										...(itemData as any),
										CHILD: child,
									},
									child[dataIndex],
									rowIndex
							  )
							: child[dataIndex]}
					</div>
				))}
		</div>
	);
}


function ExpendedCell<T, K>(props: ExpendedCellProps<T, K>) {
	let { ichildren } = props;
	ichildren = (
		<span>
			<ExpendIcon {...props} />
			{ichildren}
		</span>
	);
	return <CommonCell {...props} ichildren={ichildren} />;
}

// TODO 非双向绑定支持
// 嵌套选择
export function SelectCell<T>(props: TbodySelectCellProps<T>) {
	const { rowSelection, itemData, rowKey, childrenName = '' } = props;
	const {
		selectedRowKeys = [],
		onChange,
		getCheckboxProps,
		mode,
	} = rowSelection;
	const key = getKey(itemData, rowKey);

	let canCheckAllNestKeys: (string | number)[] = [];

	const childrenData = (itemData as any)[childrenName];
	if (Array.isArray(childrenData)) {
		const getAllCheckedParams = {
			dataSource: childrenData,
			childrenName,
			rowKey,
			getCheckboxProps,
		};
		canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);
	}

	function handleCheck(e: any) {
		const { checked } = e.target;
		if (onChange) {
			let rowKeys = selectedRowKeys;
			if (checked) {
				// 如果是单选 且选中
				if (mode === 'single') {
					rowKeys = [key];
				} else {
					rowKeys = [
						...new Set([...rowKeys, key, ...canCheckAllNestKeys]),
					];
				}
			} else if (mode === 'single') {
				// 取消的单选
				rowKeys = [];
			} else {
				const deleteKeys = [...canCheckAllNestKeys, key];
				rowKeys = rowKeys.filter(it => !deleteKeys.includes(it));
			}
			onChange(rowKeys, itemData);
		}
	}

	let checkProps = {
		onChange: handleCheck,
		checked: false,
	};
	if (getCheckboxProps) {
		checkProps = {
			...getCheckboxProps(itemData),
			...checkProps,
		};
	}
	if (selectedRowKeys) {
		checkProps.checked = selectedRowKeys.indexOf(key) > -1;
	}

	let Comp = null;

	if (mode === 'single') {
		Comp = Radio;
	} else {
		Comp = Checkbox;
	}

	return (
		<div
			key="ycCheckbox"
			className="yc-tbody-row-cell-no-line yc-tbody-row-select-cell"
			style={{
				width: SELECT_CELL_WIDTH,
				minWidth: SELECT_CELL_WIDTH,
				maxWidth: SELECT_CELL_WIDTH,
			}}
		>
			<Comp {...checkProps} />
		</div>
	);
}

function CommonCell<T, K>(props: CommonCellProps<T, K>) {
	const { useStyles, ichildren, column } = props;
	const { className = '' } = column;
	return (
		<div
			style={useStyles}
			className={`yc-tbody-row-cell-no-line ${className}`}
		>
			<span className="yc-tbody-row-cell-no-line-content">
				{ichildren}
			</span>
		</div>
	);
}

function RowCellItem<T, K>(props: RowCellItemProps<T, K>) {
	const { className, ...restProps } = props;
	const {
		cellIndex,
		childrenName,
		itemData,
		column,
		rowIndex,
		// noExpend,
	} = restProps;
	const { render, dataIndex } = column;
	const indexData = (itemData as any)[dataIndex];
	const ichildren = render
		? render(itemData, indexData, rowIndex)
		: indexData;
	if (childrenName && cellIndex === 0) {
		return <ExpendedCell {...props} ichildren={ichildren} />;
	}
	return <CommonCell {...props} ichildren={ichildren} />;
}

function RowCell<T, K>(props: RowCellProps<T, K>) {
	const { curResizedObj, column } = props;
	const { styles = {}, mul } = column;
	const useStyles = getCellWidthStyl({ curResizedObj, styles });
	if (mul) {
		return <RowMulCell {...props} useStyles={useStyles} />;
	}
	return <RowCellItem {...props} useStyles={useStyles} />;
}

/**
 * 已经将column处理过
 */
function RowCellWarp<T, K>(props: RowCellWarpProps<T, K>) {
	const { column } = props;
	return (
		<RowCell
			{...props}
			key={column.key}
			className={`column-key-is-${column.key}`}
		/>
	);
}

export default RowCellWarp;
