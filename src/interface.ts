import * as React from 'react'

export interface ColumnsConfig<T> {
    flatColumns: ColumnProps<T>[];
	resized: ResizerData[];
	columns: ColumnProps<T>[];
}

// ResizerData
export interface ResizerData {
    key?: React.Key
    minWidth?: number | string
    maxWidth?: number | string
    width?: number | string
    flexItem: number
    value?: number
    flex?: string
}

// 当前拖拽
export interface CurrentlyResizingProps {
    key: React.Key
    startX: number
    parentWidth: number
}

// 拖拽组件props
export interface ResizerProps<T> {
    setStateWithData: (prevState: any, cb?: () => void ) => void
    currentlyResizing: CurrentlyResizingProps
    columns: ColumnProps<T>[]
    column: ColumnProps<T>
    resized: ResizerData[]
    pColumn?: ColumnProps<T>
}

// 列配置item
export interface ColumnProps<T> {
    title?: React.ReactNode;
    key?: React.Key;
    dataIndex?: string;
    render?: (text: any, record: T, index: number) => React.ReactNode;
    children?: ColumnProps<T>[]
    // style 相关
    styles?: any
    width?: number | string
    maxWidth?: number | string
    minWidth?: number | string
}

export interface CheckboxProps {
    checked?: boolean
}

// 勾选配置
export interface RowSelection<T> {
    selectedRowKeys: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[]) => void;
    getCheckboxProps?: (record: T) => CheckboxProps;
    mode?: 'single' | 'multi' | undefined
}

// Table的Props
export interface TableProps<T> {
    dataSource: T[]
    columns: ColumnProps<T>[]
    rowSelection: RowSelection<T>

    className: string
    childrenName?: string
    rowKey: string | ((record: T, index?: number) => string);
}

export interface TableState<T> {
    currentlyResizing: CurrentlyResizingProps
    canCheckAllNestKeys: string[] | number[]
    flatColumns: ColumnProps<T>[]
    resized: ResizerData[]
    columns: ColumnProps<T>[]
}

// 表头配置
export interface TheadProps<T> {
    dataSource: T[]
    columns: ColumnProps<T>[]
    rowSelection: RowSelection<T>
    childrenName?: string
    rowKey: string | ((record: T, index?: number) => string);

    currentlyResizing: CurrentlyResizingProps
    resized: ResizerData[]
    setStateWithData: (prevState: any, cb?: () => void ) => void
}

// 表头的Checkbox
export interface HCheckboxProps<T> {
    rowSelection: RowSelection<T>
    dataSource: T[]
    rowKey: string | ((record: T, index?: number) => string);
    childrenName?: string
}

// 表头选择框
export interface HSelectCellProps<T> {
    rowSelection: RowSelection<T>
    dataSource: T[]
    rowKey: string | ((record: T, index?: number) => string);
    childrenName?: string
}

// 表头col
export interface HColProps<T> {
    column: ColumnProps<T>
    columns: ColumnProps<T>[]
    curResizedObj?: ResizerData

    resized: ResizerData[]
    currentlyResizing: CurrentlyResizingProps
    setStateWithData: (prevState: any, cb?: () => void ) => void
}

export interface HCellProps<T> {
    column: ColumnProps<T>
    columns: ColumnProps<T>[]
    curResizedObj?: ResizerData
    resized: ResizerData[]
    isLastCol?: Boolean

    pColumn?: ColumnProps<T>
    currentlyResizing: CurrentlyResizingProps
    setStateWithData: (prevState: any, cb?: () => void ) => void
}

export interface HCellGroupProps<T> {
    column: ColumnProps<T>
    columns: ColumnProps<T>[]
    curResizedObj?: ResizerData
    resized: ResizerData[]
    isLastCol?: Boolean

    siblingTitleArr: ColumnProps<T>[]
    // pColumn: ColumnProps<T>
    currentlyResizing: CurrentlyResizingProps
    setStateWithData: (prevState: any, cb?: () => void ) => void
}
