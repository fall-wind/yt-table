import React from 'react';
import { Icon, Checkbox, Radio } from 'antd';
import { getCellWidthStyl, getCellGroupStyl, getCanCheckAllNestKeys, getKey } from '../../utils';
import { SELECT_CELL_WIDTH } from '../../constant';

function ExpendIcon(props) {
    const {
        itemData, rowKey, indexLevel, expandedKeys, handleExpend, childrenName,
    } = props;
    if (Array.isArray(itemData[childrenName])) {
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
function RowMulCell(props) {
    const {
        render, itemData, dataIndex, mulCellKey, useStyles, rowIndex
    } = props;
    return (
        <div style={useStyles} className="yc-tbody-row-cell">
            {(itemData[mulCellKey] || []).map((child, index) => (
                <div key={index} className="yc-tbody-row-cell-line">
                    {render
                        ? render({ ...child, ...itemData, CHILD: child }, child[dataIndex], rowIndex)
                        : child[dataIndex]}
                </div>
            ))}
        </div>
    );
}

function ExpendedCell(props) {
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
export function SelectCell(props) {
    const {
        rowSelection, itemData, rowKey, childrenName
    } = props;
    const {
        selectedRowKeys = [], onChange, getCheckboxProps, mode
    } = rowSelection;
    const key = getKey(itemData, rowKey);

    let canCheckAllNestKeys = [];

    if (Array.isArray(itemData[childrenName])) {
        const getAllCheckedParams = {
            dataSource: itemData[childrenName],
            childrenName,
            rowKey,
            getCheckboxProps,
        };
        canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);
    }

    function handleCheck(e) {
        const { checked } = e.target;
        if (onChange) {
            let rowKeys = selectedRowKeys;
            if (checked) {
                // 如果是单选 且选中
                if (mode === 'single') {
                    rowKeys = [key];
                } else {
                    rowKeys = [...new Set([...rowKeys, key, ...canCheckAllNestKeys])];
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

    let Comp = null

    if (mode === 'single') {
        Comp = Radio
    } else {
        Comp = Checkbox
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

function CommonCell(props) {
    const { useStyles, ichildren, column = {} } = props;
    const { className = '' } = column;
    return (
        <div style={useStyles} className={`yc-tbody-row-cell-no-line ${className}`}>
            <span className="yc-tbody-row-cell-no-line-content">{ichildren}</span>
        </div>
    );
}

function RowCellItem(props) {
    const {
        cellIndex, childrenName, itemData, render, dataIndex, rowIndex, noExpend
    } = props;
    const ichildren = render
        ? render(itemData, itemData[dataIndex], rowIndex)
        : itemData[dataIndex];
    if (!noExpend && childrenName && cellIndex === 0) {
        return <ExpendedCell {...props} ichildren={ichildren} />;
    }
    return <CommonCell {...props} ichildren={ichildren} />;
}

function RowCell(props) {
    const { mul, curResizedObj, styles = {} } = props;
    const useStyles = getCellWidthStyl({ curResizedObj, styles });
    if (mul) {
        return <RowMulCell {...props} useStyles={useStyles} />;
    }
    return <RowCellItem {...props} useStyles={useStyles} />;
}

/**
 * 已经将column处理过
 */
function RowCellWarp(props) {
    const { column, rowKey } = props;
    // const subColumns = column.children;
    // console.error(subColumns, 'XXXXXXX')
    // if (Array.isArray(subColumns)) {
    //     return <RowCellGroup {...props} subColumns={subColumns} key={column.key} />;
    // }
    return <RowCell {...props} key={column.key} className={`column-key-is-${column.key}`} />;
}

/**
 * 暂不使用
 * 问题待解决
 */
function RowCellGroup(props) {
    const { resized, subColumns } = props;
    const useStyle = getCellGroupStyl({ siblingTitleArr: subColumns, resized });
    return (
        <div className="yc-thead-cell-group-warp" style={useStyle}>
            <div className="yc-thead-cell-group">
                {subColumns.map(item => {
                    const curResizedObj = resized.find(it => it.key === item.key);
                    // const useStyles = getCellWidthStyl({ curResizedObj, styles: item.styles });
                    return (
                        <RowCell
                            {...props}
                            {...item}
                            key={item.key}
                            curResizedObj={curResizedObj}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RowCellWarp;
