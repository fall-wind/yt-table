import * as React from 'react';
// import { Checkbox } from 'antd';
import { Checkbox } from 'antd'
import Resizer from './Resizer';
import {
	isLastChild,
	getRowMinWidth,
	getCellWidthStyl,
	getCellGroupStyl,
	getCanCheckAllNestKeys,
} from '../../utils';
import { SELECT_CELL_WIDTH } from '../../constant';
import {
	TheadProps,
	HCheckboxProps,
	HSelectCellProps,
	HColProps,
	HCellGroupProps,
	HCellProps,
} from '../../interface';

function getCheckAllVal<T>({
	selectedRowKeys,
	canCheckAllNestKeys,
}: {
	selectedRowKeys: T[];
	canCheckAllNestKeys: T[];
}) {
	return (
		canCheckAllNestKeys.length &&
		canCheckAllNestKeys.every(item => selectedRowKeys.includes(item))
	);
}

function HCheckbox<T>(props: HCheckboxProps<T>) {
	const { rowSelection, dataSource, rowKey, childrenName } = props;
	const { onChange, selectedRowKeys, getCheckboxProps } = rowSelection;
	const getAllCheckedParams = {
		dataSource,
		childrenName,
		rowKey,
		getCheckboxProps,
	};

	const canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);

	// TODO use string | number
	const checkedVal = getCheckAllVal<any>({
		selectedRowKeys,
		canCheckAllNestKeys,
	});

	function handleSelectAllChange(e: any) {
		const { checked } = e.target;
		let usedRowKeys: string[] | number[] = [];
		if (checked) {
			usedRowKeys = canCheckAllNestKeys;
		}
		onChange && onChange(usedRowKeys);
	}

	const checkProps = {
		checked: !!checkedVal,
		onChange: handleSelectAllChange,
    };

	return <Checkbox {...checkProps} />;
}

/**
 * 单选表头不显示
 * @param {*} props
 */
function HSelectCell<T>(props: HSelectCellProps<T>) {
	const { rowSelection } = props;
	const { mode } = rowSelection;

	return (
		<div
			className="yc-thead-cell yc-thead-select-cell"
			style={{
				width: SELECT_CELL_WIDTH,
				minWidth: SELECT_CELL_WIDTH,
				maxWidth: SELECT_CELL_WIDTH,
			}}
		>
			{mode !== 'single' && <HCheckbox {...props} />}
		</div>
	);
}

/**
 *
 * @param {*} props
 * Cell group存在两种拖动 总体拖动将width分配
 * 初始化的宽度是使用flex布局 cg 是根据子元素的个数flex: mul；当拖动的时候重新计算规则；
 * 当屏幕小的时候根据表格提供的最小宽度计算出 cg的最小宽度； 当屏幕放大的时候 实际宽度不等于MINWIDTH时 这个时候拖动计算就会出现问题
 * 关于获取宽度 近似于 设置value 当第二次设置发现有value 则return
 * cell 拖动
 */
function HCellGroup<T>(props: HCellGroupProps<T>) {
	const { column, isLastCol, curResizedObj, siblingTitleArr, ...rest } = props;
	const { resized } = rest;
	return (
		<div
			style={getCellGroupStyl({ siblingTitleArr, resized })}
			className="yc-thead-cell-group-warp"
		>
			<div
				className={`yc-thead-cell-top ${
					isLastCol ? 'overflow-hidden-cont' : ''
				}`}
			>
				{column.title}
				<Resizer {...props} mode="cellGroup" />
			</div>
			<div className="yc-thead-cell-group">
				{siblingTitleArr &&
					siblingTitleArr.map(item => {
						const curResizedObj = resized.find(
							it => it.key === item.key
						);
						if (!curResizedObj) {
							return null;
						}
						return (
							<HCell
                                // {...item} // 此处不展开 展开之后props混乱 从column取
                                {...rest}
								key={item.key}
								column={item}
								pColumn={column}
                                curResizedObj={curResizedObj}
                                resized={resized}
							/>
						);
					})}
			</div>
		</div>
	);
}

/**
 *
 * @param {*} props
 * 表头的排序
 */
function HCell<T>(props: HCellProps<T>) {
	const { column, curResizedObj } = props;
    const { title, styles = {} } = column;
    if (!curResizedObj) {
        return null
    }
	return (
		<div
			style={getCellWidthStyl({ curResizedObj, styles })}
			className="yc-thead-cell"
		>
			{typeof title === 'function' ? title() : title}
			{/* {isSortCol && <Sort {...props} />} */}
			<Resizer
				columns={props.columns}
				column={props.column}
				resized={props.resized}
				currentlyResizing={props.currentlyResizing}
				setStateWithData={props.setStateWithData}
			/>
		</div>
	);
}

/**
 *
 * @param props
 */
function HCol<T>(props: HColProps<T>) {
	const { column, columns } = props;
    const isLastCol = isLastChild(columns, column);
	if (column.children) {
		return <HCellGroup {...props} siblingTitleArr={column.children} isLastCol={isLastCol} />;
	}
	return <HCell {...props} isLastCol={isLastCol} />;
}

export default function Thead<T>(props: TheadProps<T>) {
	const { columns, resized, rowSelection } = props;

	return (
		<div
			className="yc-thead-warp"
			style={{ minWidth: getRowMinWidth({ resized, rowSelection }) }}
		>
			<div className="yc-thead">
				{rowSelection && <HSelectCell {...props} />}
				{columns.map(column => {
					const curResizedObj = resized.find(
						it => it.key === column.key
					);
					return (
						<HCol
							{...props}
							key={column.key}
							// {...column}
							column={column}
							curResizedObj={curResizedObj}
						/>
					);
				})}
			</div>
		</div>
	);
}
