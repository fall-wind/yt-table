import * as React from 'react';

export interface ColumnsConfig<T> {
	flatColumns: ColumnProps<T>[];
	resized: ResizerData[];
	columns: ColumnProps<T>[];
}

// ResizerData
export interface ResizerData {
	key?: React.Key;
	minWidth?: number | string;
	maxWidth?: number | string;
	width?: number | string;
	flexItem: number;
	value?: number;
	flex?: string;
}

// 当前拖拽
export interface CurrentlyResizingProps {
	key: React.Key;
	startX: number;
	parentWidth: number;
}

// 拖拽组件props
export interface ResizerProps<T> {
	setStateWithData: (prevState: any, cb?: () => void) => void;
	currentlyResizing: CurrentlyResizingProps;
	columns: ColumnProps<T>[];
	column: ColumnProps<T>;
	resized: ResizerData[];
	pColumn?: ColumnProps<T>;
}

// 列配置item
export interface ColumnProps<T> {
	title: React.ReactNode;
	key: React.Key;
	dataIndex: string;
	render?: (text: any, record: T, index: number) => React.ReactNode;
	children?: ColumnProps<T>[];
	// style 相关
	styles?: any;
	width?: number | string;
	maxWidth?: number | string;
	minWidth?: number | string;
	mul?: boolean;
	className?: string;
}

export interface CheckboxProps {
	checked?: boolean;
	disabled?: boolean;
}

// 勾选配置
export interface RowSelection<T> {
	selectedRowKeys: (string | number)[];
	onChange?: (selectedRowKeys: (string | number)[], record: T) => void;
	getCheckboxProps?: (record: T) => CheckboxProps;
	mode?: 'single' | 'multi' | undefined;
}

// Table的Props
export interface TableProps<T> {
	dataSource: T[];
	columns: ColumnProps<T>[];
	rowSelection: RowSelection<T>;

	className: string;
	childrenName?: string;
	rowKey: string | ((record: T, index?: number) => string);
}

export interface TableState<T> {
	currentlyResizing: CurrentlyResizingProps;
	canCheckAllNestKeys: string[] | number[];
	flatColumns: ColumnProps<T>[];
	resized: ResizerData[];
	columns: ColumnProps<T>[];
}

/**
 * ==========================================================================================
 * 表头部分 Thead
 * ==========================================================================================
 */
export interface TheadProps<T> {
	dataSource: T[];
	columns: ColumnProps<T>[];
	rowSelection: RowSelection<T>;
	childrenName?: string;
	rowKey: string | ((record: T, index?: number) => string);

	currentlyResizing: CurrentlyResizingProps;
	resized: ResizerData[];
	setStateWithData: (prevState: any, cb?: () => void) => void;
}

// 表头的Checkbox
export interface HCheckboxProps<T> {
	rowSelection: RowSelection<T>;
	dataSource: T[];
	rowKey: string | ((record: T, index?: number) => string);
	childrenName?: string;
}

// 表头选择框
export interface HSelectCellProps<T> {
	rowSelection: RowSelection<T>;
	dataSource: T[];
	rowKey: string | ((record: T, index?: number) => string);
	childrenName?: string;
}

// 表头col
export interface HColProps<T> {
	column: ColumnProps<T>;
	columns: ColumnProps<T>[];
	curResizedObj?: ResizerData;

	resized: ResizerData[];
	currentlyResizing: CurrentlyResizingProps;
	setStateWithData: (prevState: any, cb?: () => void) => void;
}

export interface HCellProps<T> {
	column: ColumnProps<T>;
	columns: ColumnProps<T>[];
	curResizedObj?: ResizerData;
	resized: ResizerData[];
	isLastCol?: Boolean;

	pColumn?: ColumnProps<T>;
	currentlyResizing: CurrentlyResizingProps;
	setStateWithData: (prevState: any, cb?: () => void) => void;
}

export interface HCellGroupProps<T> {
	column: ColumnProps<T>;
	columns: ColumnProps<T>[];
	curResizedObj?: ResizerData;
	resized: ResizerData[];
	isLastCol?: Boolean;

	siblingTitleArr: ColumnProps<T>[];
	// pColumn: ColumnProps<T>
	currentlyResizing: CurrentlyResizingProps;
	setStateWithData: (prevState: any, cb?: () => void) => void;
}

/**
 * ==========================================================================================
 * 表体 Tbody
 * ==========================================================================================
 */
export interface TbodyProps<T> {
	dataSource: T[];
	columns: ColumnProps<T>[];
	rowSelection: RowSelection<T>;
	childrenName?: string;
	mulCellKey?: string;
	rowKey: string | ((record: T, index?: number) => string);

	resized: ResizerData[];
}

export interface TbodyState<K> {
	expandedKeys: K[];
}

export interface BodyRowWarpProps<T, K> {
	columns: ColumnProps<T>[];
	rowKey: string | ((record: T, index?: number) => string);
	childrenName?: string;

	pId: number;
	itemData: T;
	expandedKeys: K[];
	rowIndex: number;
	indexLevel: number;
	mulCellKey?: string;
	resized: ResizerData[];
	rowSelection: RowSelection<T>;

	// curResizedObj: ResizerData

	handleExpend: (id: K, itemData: T) => void;
}

export interface BodyRowProps<T, K> {
	rowKey: string | ((record: T, index?: number) => string);
	columns: ColumnProps<T>[];
	itemData: T;
	mulCellKey?: string;
	resized: ResizerData[];
	expandedKeys: K[];
	pId: number;
	rowSelection: RowSelection<T>;

	rowIndex: number;
	indexLevel: number;
	// curResizedObj: ResizerData
	// noExpend: boolean
    // style: any
    handleExpend: (id: K, itemData: T) => void;
}

export interface RowCellWarpProps<T, K> {
	curResizedObj: ResizerData;
	column: ColumnProps<T>;
	mulCellKey?: string;
	itemData: T;

	indexLevel: number;
	childrenName?: string;
	cellIndex: number;
    rowIndex: number;
    handleExpend: (id: K, itemData: T) => void;
    rowKey: string | ((record: T, index?: number) => string);
    expandedKeys: K[];
}

export interface RowCellProps<T, K> {
	curResizedObj: ResizerData;
	column: ColumnProps<T>;
	mulCellKey?: string;

	className: string;
	cellIndex: number;
	itemData: T;
	rowIndex: number;
    indexLevel: number;
    handleExpend: (id: K, itemData: T) => void;
    expandedKeys: K[];
    rowKey: string | ((record: T, index?: number) => string);
}

export interface RowCellItemProps<T, K> {
	className: string;
	cellIndex: number;
	childrenName?: string;

	itemData: T;
	column: ColumnProps<T>;
	rowIndex: number;
	useStyles: any;
    indexLevel: number;
    rowKey: string | ((record: T, index?: number) => string);
    handleExpend: (id: K, itemData: T) => void;
    expandedKeys: K[];
}

export interface RowMulCellProps<T> {
	className: string;
	cellIndex: number;
	childrenName?: string;
	mulCellKey?: string;

	itemData: T;
	column: ColumnProps<T>;
	rowIndex: number;
	useStyles: any;
}

export interface CommonCellProps<T, K> {
	useStyles: any;
	ichildren: React.ReactNode;
	column: ColumnProps<T>;
	itemData: T;

	className: string;
	indexLevel: number;
	rowKey: string | ((record: T, index?: number) => string);
    expandedKeys: K[];
    handleExpend: (id: K, itemData: T) => void;
}

export interface TbodySelectCellProps<T> {
	rowSelection: RowSelection<T>;
	itemData: T;
	rowKey: string | ((record: T, index?: number) => string);

	// curResizedObj: ResizerData
	childrenName?: string;
	mulCellKey?: string;
}

export interface ExpendedCellProps<T, K> extends CommonCellProps<T, K> {}

export interface ExpendIconProps<T, K> {
	itemData: T;
	indexLevel: number;
	rowKey: string | ((record: T, index?: number) => string);
	expandedKeys: K[];
	handleExpend: (id: K, itemData: T) => void;
	childrenName?: string;
}

export interface BodyCommonProps<T, K> {
	rowKey: string | ((record: T, index?: number) => string);
	handleExpend: (id: K, itemData: T) => void;
	expandedKeys: K[];
	childrenName?: string;
}
