import React from 'react';
import { Checkbox, Icon } from 'antd';
import Resizer from './Resizer';
import {
    isLastChild,
    getRowMinWidth,
    getCellWidthStyl,
    getCellGroupStyl,
    getCanCheckAllNestKeys,
} from '../../utils';
import { SELECT_CELL_WIDTH } from '../../constant';
/**
 * ascend 升序
 * descend 倒叙
 * 升序时展示向下箭头 倒序时展示向上箭头
 */
class Sort extends React.Component {
    constructor(props) {
        super(props);
        const { column } = props;
        this.state = {
            sortOrder: column.sortOrder || 'ascend',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.column.sortOrder) {
            if (nextProps.column.sortOrder !== this.state.sortOrder) {
                // this.setState({
                //     sortOrder: nextProps.column.sortOrder,
                // });
            }
        }
    }

    toggleSortOrder = (order, column) => {
        const { onChange } = this.props;
        this.setState({
            sortOrder: order,
        });
        if (onChange) {
            const params = {
                column,
                order,
                columnKey: column.dataIndex,
            };
            onChange({}, {}, params);
        }
    };

    render() {
        const { column } = this.props;
        const { sortOrder } = this.state;
        const isAscend = sortOrder === 'ascend';
        const isDescend = sortOrder === 'descend';
        return (
            <div className="yc-thead-sort">
                {isAscend && (
                    <Icon
                        className="yc-column-sorter-up"
                        type="up"
                        onClick={() => {
                            this.toggleSortOrder('descend', column);
                        }}
                    />
                )}
                {isDescend && (
                    <Icon
                        className="yc-column-sorter-down"
                        type="down"
                        onClick={() => {
                            this.toggleSortOrder('ascend', column);
                        }}
                    />
                )}
            </div>
        );
    }
}

/**
 *
 * @param {*} props
 * 表头的排序
 */
function HCell(props) {
    const {
        title, column, styles = {}, curResizedObj
    } = props;
    const isSortCol = column.sorter;
    return (
        <div style={getCellWidthStyl({ curResizedObj, styles })} className="yc-thead-cell">
            {typeof title === 'function' ? title() : title}
            {isSortCol && <Sort {...props} />}
            <Resizer {...props} />
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
function HCellGroup(props) {
    const {
        columns, column, fatherTitle, isLastCol, dataIndex, curResizedObj, ...rest
    } = props;
    const { resized } = rest;
    const siblingTitleArr = column.children;
    return (
        <div
            style={getCellGroupStyl({ siblingTitleArr, resized })}
            className="yc-thead-cell-group-warp"
        >
            <div className={`yc-thead-cell-top ${isLastCol ? 'overflow-hidden-cont' : ''}`}>
                {column.title}
                <Resizer {...props} mode="cellGroup" />
            </div>
            <div className="yc-thead-cell-group">
                {siblingTitleArr.map(item => (
                    <HCell
                        {...rest}
                        {...item}
                        key={item.key}
                        column={item}
                        pColumn={column}
                        curResizedObj={resized.find(it => it.key === item.key)}
                    />
                ))}
            </div>
        </div>
    );
}

function HCol(props) {
    const { column, columns } = props;
    const isLastCol = isLastChild(columns, column);
    if (column.children) {
        return <HCellGroup {...props} isLastCol={isLastCol} />;
    }
    return <HCell {...props} isLastCol={isLastCol} />;
}

function getCheckAllVal({ selectedRowKeys, canCheckAllNestKeys }) {
    return (
        canCheckAllNestKeys.length &&
        canCheckAllNestKeys.every(item => selectedRowKeys.includes(item))
    );
}

function HSelectCellChildren(props) {
    const {
        rowSelection, dataSource, rowKey, childrenName, mode
    } = props;
    const { onChange, selectedRowKeys, getCheckboxProps } = rowSelection;
    const getAllCheckedParams = {
        dataSource,
        childrenName,
        rowKey,
        getCheckboxProps,
    };

    const canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);

    const checkedVal = getCheckAllVal({
        selectedRowKeys,
        canCheckAllNestKeys,
        getCheckboxProps,
        rowKey,
    });

    function handleSelectAllChange(e) {
        const { checked } = e.target;
        let usedRowKeys = [];
        if (checked) {
            usedRowKeys = canCheckAllNestKeys;
        }
        onChange(usedRowKeys);
    }

    const checkProps = {
        checked: checkedVal,
        onChange: handleSelectAllChange,
    };

    return <Checkbox {...checkProps} />;
}

/**
 * 单选表头不显示
 * @param {*} props
 */
function HSelectCell(props) {
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
            {mode !== 'single' && <HSelectCellChildren {...props} />}
        </div>
    );
}

export default function Thead(props) {
    const { columns, resized, rowSelection } = props;

    return (
        <div
            className="yc-thead-warp"
            style={{ minWidth: getRowMinWidth({ resized, rowSelection }) }}
        >
            <div className="yc-thead">
                {rowSelection && <HSelectCell {...props} />}
                {columns.map(column => (
                    <HCol
                        key={column.key}
                        {...column}
                        column={column}
                        {...props}
                        curResizedObj={resized.find(it => it.key === column.key)}
                    />
                ))}
            </div>
        </div>
    );
}
