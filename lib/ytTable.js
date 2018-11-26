(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('prop-types'), require('react'), require('antd')) :
	typeof define === 'function' && define.amd ? define(['prop-types', 'react', 'antd'], factory) :
	(global.ytTable = factory(global.PropTypes,global.React,global.antd));
}(this, (function (PropTypes,React,antd) { 'use strict';

PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
React = React && React.hasOwnProperty('default') ? React['default'] : React;

var propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    className: PropTypes.string
};

/* eslint-disable */
var MIN_WIDTH = 80;

var GARG_MIN_WIDTH = 60;

var SELECT_CELL_WIDTH = 40;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* eslint-disable */
function genItemResize(item) {
    var _item$styles = item.styles,
        styles = _item$styles === undefined ? {} : _item$styles,
        width = item.width,
        maxWidth = item.maxWidth,
        minWidth = item.minWidth;
    var flexItem = styles.flexItem;

    var usedFlexItem = flexItem;
    var usedWidth = styles.width || width || minWidth || styles.minWidth;
    // 若存在flexItem，以flexItem为主
    if (usedWidth && !usedFlexItem) {
        usedFlexItem = usedWidth / MIN_WIDTH;
    }
    var initWidthStyl = {
        key: item.key,
        minWidth: styles.minWidth || minWidth,
        maxWidth: styles.maxWidth || maxWidth,
        width: styles.width || width || minWidth || styles.minWidth,
        flexItem: usedFlexItem || 1
    };
    // if (width) {
    //     if (Number.isNaN(Number(width))) {
    //         if (typeof width === 'string' && width.indexOf('%') > -1) {
    //             initWidthStyl.flex = `${width.slice(0, -1)} 0 auto`
    //         }
    //     } else {
    //         initWidthStyl = {
    //             ...initWidthStyl,
    //             flex: `${width} 0 auto`,
    //             // value: width,
    //             width,
    //         }
    //     }
    // }
    return initWidthStyl;
}

function genInitResize(_ref) {
    var columns = _ref.columns;

    return columns.map(genItemResize);
}

function genInitConfig(columns) {
    var flatColumns = getFlatColumns(columns);
    return {
        flatColumns: flatColumns,
        resized: genInitResize({ columns: flatColumns }),
        columns: columns
    };
}

/**
 *
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} getKey
 */
function checkTwoArrIndexKeyEqual(arr1, arr2, getKey) {
    return !arr1.some(function (it1, index) {
        var it2 = arr2[index];
        return getKey(it1) !== getKey(it2);
    });
}

function genNewConfigFromOld(newColumn, oldColumn, oldResized) {
    var flatColumns = getFlatColumns(newColumn);
    var oldFlatColumns = getFlatColumns(oldColumn);
    var resized = flatColumns.map(function (item) {
        var oldItem = oldFlatColumns.find(function (oItem) {
            return oItem.key === item.key;
        });
        if (oldItem) {
            var oldResize = oldResized.find(function (it) {
                return it.key === item.key;
            });
            if (oldResize.value) {
                return oldResize;
            }
        }
        return genItemResize(item);
    });
    return {
        flatColumns: flatColumns,
        resized: resized,
        columns: newColumn
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
function genNewConfigByOld(_ref2) {
    var newColumn = _ref2.newColumn,
        oldColumn = _ref2.oldColumn,
        oldResized = _ref2.oldResized;

    if (newColumn !== oldColumn) {
        var flatColumns = getFlatColumns(newColumn);
        var oldFlatColumns = getFlatColumns(oldColumn);
        var newConfig = genInitConfig(newColumn);
        if (newColumn.length !== oldColumn.length || flatColumns.length !== oldFlatColumns.length) {
            if (oldColumn.length === 0) {
                return genInitConfig(newColumn);
            } else {
                return genNewConfigFromOld(newColumn, oldColumn, oldResized);
            }
        } else {
            if (checkTwoArrIndexKeyEqual(newColumn, oldColumn, function (item) {
                return item.key;
            })) {
                return {
                    columns: newConfig.columns,
                    flatColumns: newConfig.flatColumns
                };
            }
            return genInitConfig(newColumn);
        }
    }
    return null;
}

function getFlatColumns(columns) {
    return columns.reduce(function (pre, cur) {
        var children = cur.children;

        if (children) {
            return pre.concat(children);
        }
        return pre.concat(cur);
    }, []);
}

function genResizeByFlatCol(_ref3) {
    var currentlyResizing = _ref3.currentlyResizing,
        columns = _ref3.columns,
        newWidth = _ref3.newWidth,
        resized = _ref3.resized;

    return resized.map(function (item) {
        if (item.key === currentlyResizing.key) {
            return _extends({}, item, {
                value: newWidth
            });
        }
        return item;
    });
}

function pxAdd(a, b) {
    return getNumWidth(a) + getNumWidth(b);
}

function genResizeFromCellGroup(_ref4) {
    var resize = _ref4.resize,
        averVal = _ref4.averVal;
    var value = resize.value,
        maxWidth = resize.maxWidth,
        minWidth = resize.minWidth,
        width = resize.width;

    var usedKey = '';

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
    var calcVal = pxAdd(resize[usedKey] || MIN_WIDTH, averVal);
    if (calcVal > MIN_WIDTH) {
        return _extends({}, resize, {
            value: genWidthVal(calcVal)
        });
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
function genResizeByNestCol(_ref5) {
    var currentlyResizing = _ref5.currentlyResizing,
        newWidth = _ref5.newWidth,
        resized = _ref5.resized,
        columns = _ref5.columns,
        column = _ref5.column;

    var children = column.children;
    function checkIsChildResizeCb(item) {
        return children.find(function (child) {
            return item.key === child.key;
        });
    }
    var subResized = resized.filter(checkIsChildResizeCb);
    var subResizedLen = subResized.length;
    var oldCellGroupStyl = getCellGroupStyl({ siblingTitleArr: children, resized: resized });
    var oldWidth = oldCellGroupStyl.minWidth;
    var averVal = (newWidth - oldWidth) / subResizedLen;
    return resized.map(function (resize) {
        if (checkIsChildResizeCb(resize)) {
            return genResizeFromCellGroup({
                averVal: averVal,
                resize: resize
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
function genResizeWithSiblingCell(_ref6) {
    var currentlyResizing = _ref6.currentlyResizing,
        newWidth = _ref6.newWidth,
        resized = _ref6.resized,
        pColumn = _ref6.pColumn;

    var pChildren = pColumn.children;
    var curResizd = resized.find(function (it) {
        return it.key === currentlyResizing.key;
    });
    return resized.map(function (item) {
        var isSiblingCol = pChildren.find(function (it) {
            return it.key === item.key;
        });
        if (curResizd === item) {
            return _extends({}, item, {
                value: newWidth,
                minWidth: newWidth
            });
        } else if (isSiblingCol) {
            var value = item.value,
                minWidth = item.minWidth,
                flexItem = item.flexItem;

            if (!value && !minWidth) {
                var itemWidth = flexItem / curResizd.flexItem * newWidth;
                return _extends({}, item, {
                    value: itemWidth,
                    minWidth: itemWidth
                });
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

function genResize(_ref7) {
    var currentlyResizing = _ref7.currentlyResizing,
        newWidth = _ref7.newWidth,
        resized = _ref7.resized,
        pColumn = _ref7.pColumn,
        _ref7$column = _ref7.column,
        column = _ref7$column === undefined ? {} : _ref7$column;

    var children = column.children;
    if (children && Array.isArray(children)) {
        return genResizeByNestCol({ currentlyResizing: currentlyResizing, newWidth: newWidth, resized: resized, column: column });
    } else if (isObject(pColumn)) {
        return genResizeWithSiblingCell({
            currentlyResizing: currentlyResizing,
            newWidth: newWidth,
            resized: resized,
            column: column,
            pColumn: pColumn
        });
    }
    return genResizeByFlatCol({ currentlyResizing: currentlyResizing, newWidth: newWidth, resized: resized });
}

function getNumWidth(width) {
    if (typeof width === 'string') {
        var useStr = width;
        if (width.indexOf('px') > -1) {
            return useStr = width.slice(0, -2);
        }
        return Number(useStr);
    } else if (typeof width === 'number') {
        return width;
    } else {
        throw Error('type error! you should use number string as a ');
    }
}

function getCurLen(cur) {
    var value = cur.value,
        flex = cur.flex,
        minWidth = cur.minWidth;

    if (value) {
        if (minWidth) {
            var minWidthNum = getNumWidth(minWidth);
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
function getMinWidthByResized(resized) {
    return resized.flexItem * MIN_WIDTH;
}

function getRowMinWidth(_ref8) {
    var resized = _ref8.resized,
        rowSelection = _ref8.rowSelection;

    var initWidth = rowSelection ? SELECT_CELL_WIDTH : 0;
    var rowMinWidth = resized.reduce(function (pre, cur) {
        var curLen = getCurLen(cur);
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

function getCellWidthStyl(_ref9) {
    var curResizedObj = _ref9.curResizedObj,
        styles = _ref9.styles;
    var minWidth = styles.minWidth,
        restStyle = objectWithoutProperties(styles, ['minWidth']);
    var value = curResizedObj.value,
        _curResizedObj$flexIt = curResizedObj.flexItem,
        flexItem = _curResizedObj$flexIt === undefined ? 1 : _curResizedObj$flexIt,
        key = curResizedObj.key,
        reSizedStyle = objectWithoutProperties(curResizedObj, ['value', 'flexItem', 'key']);

    var usedstyles = {};
    if (curResizedObj.value) {
        usedstyles = {
            flex: curResizedObj.value + ' 0 auto',
            width: curResizedObj.value,
            maxWidth: curResizedObj.value,
            minWidth: curResizedObj.value
        };
    } else if (curResizedObj.flex) {
        usedstyles = {
            flex: curResizedObj.flex,
            width: curResizedObj.width
            // width: curResizedObj.value,
            // maxWidth: curResizedObj.value,
        };
    } else if (curResizedObj.minWidth) {
        usedstyles.minWidth = curResizedObj.minWidth;
        usedstyles.flex = curResizedObj.minWidth + ' 0 auto';
    } else if (curResizedObj.width) {
        usedstyles = {
            flex: flexItem,
            minWidth: curResizedObj.width
        };
    } else {
        usedstyles = {
            flex: flexItem,
            minWidth: getMinWidthByResized(curResizedObj)
        };
    }
    return _extends({}, restStyle, reSizedStyle, usedstyles);
}

function getCellGroupStyl(_ref10) {
    var siblingTitleArr = _ref10.siblingTitleArr,
        resized = _ref10.resized;

    var siblingResize = resized.filter(function (item) {
        return siblingTitleArr.find(function (it) {
            return it.key === item.key;
        });
    });
    var childHasFlexStyleFlag = siblingResize.some(function (it) {
        return it.value;
    });
    var usedstyles = {};
    if (childHasFlexStyleFlag) {
        var width = siblingResize.reduce(function (pre, cur) {
            var useVal = getMinWidthByResized(cur);
            if (cur.value) {
                useVal = cur.value;
            } else if (cur.minWidth) {
                useVal = cur.minWidth;
            }
            return pre + useVal;
        }, 0);
        usedstyles = {
            flex: width + ' 0 auto',
            minWidth: width,
            maxWidth: width,
            width: width
        };
    } else {
        var minWidth = siblingResize.reduce(function (pre, cur) {
            return pre + ((cur || {}).minWidth || (cur || {}).width || getMinWidthByResized(cur));
        }, 0);
        usedstyles = {
            flex: siblingResize.reduce(function (pre, cur) {
                return pre + cur.flexItem;
            }, 0),
            minWidth: minWidth
        };
    }
    return usedstyles;
}

/**
 *
 * @param {*} value 整数。。。
 */
function genWidthVal(value) {
    return Math.round(value);
}

function getKey(data, rowkey) {
    if (typeof rowkey === 'function') {
        return rowkey(data);
    }
    return data[rowkey];
}

function getCanCheckAllNestKeys(_ref11) {
    var dataSource = _ref11.dataSource,
        childrenName = _ref11.childrenName,
        rowKey = _ref11.rowKey,
        getCheckboxProps = _ref11.getCheckboxProps;

    var filterCb = function filterCb(it) {
        return getCheckboxProps ? !(getCheckboxProps(it) || {}).disabled : true;
    };
    var arr = [];
    var loop = function loop(data) {
        data.forEach(function (item) {
            if (filterCb && filterCb(item)) {
                arr.push(getKey(item, rowKey));
            } else {
                // arr.push(rowKey(item));
            }
            if (Array.isArray(item[childrenName])) {
                loop(item[childrenName]);
            }
        });
    };
    loop(dataSource);
    return arr;
}



/**
 * @param {*} arr
 * @param {*} ele
 */
function isLastChild(arr, ele) {
    var arrLen = arr.length;
    return arrLen - 1 === arr.findIndex(function (it) {
        return it === ele;
    });
}

function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return value != null && (type === 'object' || type === 'function');
}

/**
 *
 * @param {number} num1
 * @param {number} num2
 */
function preAcc(num1, num2) {
    var r1 = getDecimalLen(num1);
    var r2 = getDecimalLen(num2);
    return Math.pow(10, Math.max(r1, r2));
}

function accAdd(num1, num2) {
    var m = preAcc(num1, num2);
    return Math.round(num1 * m + num2 * m) / m;
}



/**
 *
 * @param {*} num
 */
function getDecimalLen(num) {
    var len = void 0;
    try {
        len = num.toString().split('.')[1].length;
    } catch (error) {
        len = 0;
    }
    return len;
}

function ExpendIcon(props) {
    var itemData = props.itemData,
        rowKey = props.rowKey,
        indexLevel = props.indexLevel,
        expandedKeys = props.expandedKeys,
        handleExpend = props.handleExpend,
        childrenName = props.childrenName;

    if (Array.isArray(itemData[childrenName])) {
        var itemKey = getKey(itemData, rowKey);
        return React.createElement(
            'span',
            {
                style: {
                    cursor: 'pointer',
                    marginLeft: (Number(indexLevel) - 1) * 10
                },
                onClick: function onClick() {
                    handleExpend(itemKey, itemData);
                }
            },
            expandedKeys.indexOf(itemKey) === -1 ? React.createElement(antd.Icon, { type: 'caret-right' }) : React.createElement(antd.Icon, { type: 'caret-down' })
        );
    }
    return React.createElement('span', {
        style: {
            cursor: 'pointer',
            width: 12,
            display: 'inline-block',
            marginLeft: (Number(indexLevel) - 1) * 15
        }
    });
}

/**
 * data以itemData为准；因为CHILD属性
 * @param {*} props
 */
function RowMulCell(props) {
    var render = props.render,
        itemData = props.itemData,
        dataIndex = props.dataIndex,
        mulCellKey = props.mulCellKey,
        useStyles = props.useStyles,
        rowIndex = props.rowIndex;

    return React.createElement(
        'div',
        { style: useStyles, className: 'yc-tbody-row-cell' },
        (itemData[mulCellKey] || []).map(function (child, index) {
            return React.createElement(
                'div',
                { key: index, className: 'yc-tbody-row-cell-line' },
                render ? render(_extends({}, child, itemData, { CHILD: child }), child[dataIndex], rowIndex) : child[dataIndex]
            );
        })
    );
}

function ExpendedCell(props) {
    var ichildren = props.ichildren;

    ichildren = React.createElement(
        'span',
        null,
        React.createElement(ExpendIcon, props),
        ichildren
    );
    return React.createElement(CommonCell, _extends({}, props, { ichildren: ichildren }));
}

// TODO 非双向绑定支持
// 嵌套选择
function SelectCell(props) {
    var rowSelection = props.rowSelection,
        itemData = props.itemData,
        rowKey = props.rowKey,
        childrenName = props.childrenName;
    var _rowSelection$selecte = rowSelection.selectedRowKeys,
        selectedRowKeys = _rowSelection$selecte === undefined ? [] : _rowSelection$selecte,
        onChange = rowSelection.onChange,
        getCheckboxProps = rowSelection.getCheckboxProps,
        mode = rowSelection.mode;

    var key = getKey(itemData, rowKey);

    var canCheckAllNestKeys = [];

    if (Array.isArray(itemData[childrenName])) {
        var getAllCheckedParams = {
            dataSource: itemData[childrenName],
            childrenName: childrenName,
            rowKey: rowKey,
            getCheckboxProps: getCheckboxProps
        };
        canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);
    }

    function handleCheck(e) {
        var checked = e.target.checked;

        if (onChange) {
            var rowKeys = selectedRowKeys;
            if (checked) {
                // 如果是单选 且选中
                if (mode === 'single') {
                    rowKeys = [key];
                } else {
                    rowKeys = [].concat(new Set([].concat(rowKeys, [key], canCheckAllNestKeys)));
                }
            } else if (mode === 'single') {
                // 取消的单选
                rowKeys = [];
            } else {
                var deleteKeys = [].concat(canCheckAllNestKeys, [key]);
                rowKeys = rowKeys.filter(function (it) {
                    return !deleteKeys.includes(it);
                });
            }
            onChange(rowKeys, itemData);
        }
    }

    var checkProps = {
        onChange: handleCheck
    };
    if (getCheckboxProps) {
        checkProps = _extends({}, getCheckboxProps(itemData), checkProps);
    }
    if (selectedRowKeys) {
        checkProps.checked = selectedRowKeys.indexOf(key) > -1;
    }

    var Comp = null;

    if (mode === 'single') {
        Comp = antd.Radio;
    } else {
        Comp = antd.Checkbox;
    }

    return React.createElement(
        'div',
        {
            key: 'ycCheckbox',
            className: 'yc-tbody-row-cell-no-line yc-tbody-row-select-cell',
            style: {
                width: SELECT_CELL_WIDTH,
                minWidth: SELECT_CELL_WIDTH,
                maxWidth: SELECT_CELL_WIDTH
            }
        },
        React.createElement(Comp, checkProps)
    );
}

function CommonCell(props) {
    var useStyles = props.useStyles,
        ichildren = props.ichildren,
        _props$column = props.column,
        column = _props$column === undefined ? {} : _props$column;
    var _column$className = column.className,
        className = _column$className === undefined ? '' : _column$className;

    return React.createElement(
        'div',
        { style: useStyles, className: 'yc-tbody-row-cell-no-line ' + className },
        React.createElement(
            'span',
            { className: 'yc-tbody-row-cell-no-line-content' },
            ichildren
        )
    );
}

function RowCellItem(props) {
    var cellIndex = props.cellIndex,
        childrenName = props.childrenName,
        itemData = props.itemData,
        render = props.render,
        dataIndex = props.dataIndex,
        rowIndex = props.rowIndex,
        noExpend = props.noExpend;

    var ichildren = render ? render(itemData, itemData[dataIndex], rowIndex) : itemData[dataIndex];
    if (!noExpend && childrenName && cellIndex === 0) {
        return React.createElement(ExpendedCell, _extends({}, props, { ichildren: ichildren }));
    }
    return React.createElement(CommonCell, _extends({}, props, { ichildren: ichildren }));
}

function RowCell(props) {
    var mul = props.mul,
        curResizedObj = props.curResizedObj,
        _props$styles = props.styles,
        styles = _props$styles === undefined ? {} : _props$styles;

    var useStyles = getCellWidthStyl({ curResizedObj: curResizedObj, styles: styles });
    if (mul) {
        return React.createElement(RowMulCell, _extends({}, props, { useStyles: useStyles }));
    }
    return React.createElement(RowCellItem, _extends({}, props, { useStyles: useStyles }));
}

/**
 * 已经将column处理过
 */
function RowCellWarp(props) {
    var column = props.column,
        rowKey = props.rowKey;
    // const subColumns = column.children;
    // console.error(subColumns, 'XXXXXXX')
    // if (Array.isArray(subColumns)) {
    //     return <RowCellGroup {...props} subColumns={subColumns} key={column.key} />;
    // }

    return React.createElement(RowCell, _extends({}, props, { key: column.key, className: 'column-key-is-' + column.key }));
}

/**
 * 暂不使用
 * 问题待解决
 */

/* eslint-disable */
var BodyRowWarp = function (_React$PureComponent) {
    inherits(BodyRowWarp, _React$PureComponent);

    function BodyRowWarp() {
        classCallCheck(this, BodyRowWarp);
        return possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    BodyRowWarp.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            rowKey = _props.rowKey,
            itemData = _props.itemData,
            childrenName = _props.childrenName,
            indexLevel = _props.indexLevel;

        var showArr = [React.createElement(BodyRow, _extends({ key: getKey(itemData, rowKey) }, this.props))];
        var childrenData = itemData[childrenName];
        if (Array.isArray(childrenData)) {
            showArr = showArr.concat(childrenData.map(function (item) {
                return React.createElement(BodyRowWarp, _extends({}, _this2.props, {
                    itemData: item,
                    key: getKey(item, rowKey),
                    pId: getKey(itemData, rowKey),
                    indexLevel: indexLevel + 1
                }));
            }));
        }
        return showArr;
    };

    return BodyRowWarp;
}(React.PureComponent);

function BodyRow(props) {
    var columns = props.columns,
        itemData = props.itemData,
        mulCellKey = props.mulCellKey,
        resized = props.resized,
        expandedKeys = props.expandedKeys,
        pId = props.pId,
        rowSelection = props.rowSelection,
        noExpend = props.noExpend,
        _props$style = props.style,
        style = _props$style === undefined ? {} : _props$style;

    var rowStyle = _extends({}, style);
    if (!noExpend && pId !== 0 && expandedKeys.indexOf(pId) === -1) {
        rowStyle.display = 'none';
    }
    return React.createElement(
        'div',
        { className: 'yc-tbody-row', style: rowStyle },
        rowSelection && React.createElement(SelectCell, props),
        columns.map(function (column, index) {
            return React.createElement(RowCellWarp, _extends({}, props, {
                itemData: itemData,
                mulCellKey: mulCellKey
            }, column, {
                key: column.key,
                cellIndex: index,
                column: column,
                curResizedObj: resized.find(function (it) {
                    return it.key === column.key;
                })
            }));
        })
    );
}

var NoDataDiv = function NoDataDiv() {
	return React.createElement(
		'div',
		{
			style: {
				padding: '16px 8px',
				background: '#fff',
				textAlign: 'center',
				fontSize: '12px',
				color: 'rgba(0, 0, 0, 0.43)'
			}
		},
		React.createElement(antd.Icon, { type: 'frown-o' }),
		' \u6682\u65E0\u6570\u636E'
	);
};

/**
 * childrenName 即认为是树形的表格结构
 */

var Tbody = function (_React$Component) {
	inherits(Tbody, _React$Component);

	function Tbody() {
		var _temp, _this, _ret;

		classCallCheck(this, Tbody);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			expandedKeys: []
		}, _this.handleExpend = function (id, itemData) {
			var expandedKeys = _this.state.expandedKeys;
			var childrenName = _this.props.childrenName;

			var newKeys = [];

			if (expandedKeys.indexOf(id) > -1) {
				var keys = _this.gCKeys(id, itemData, childrenName);
				newKeys = expandedKeys.filter(function (item) {
					return !keys.some(function (it) {
						return it == item;
					});
				});
			} else {
				newKeys = [].concat(expandedKeys, [id]);
			}
			_this.setState({
				expandedKeys: newKeys
			});
		}, _this.gCKeys = function (itemKey, itemData) {
			var _this$props = _this.props,
			    rowKey = _this$props.rowKey,
			    childrenName = _this$props.childrenName;

			var arr = [];
			var loop = function loop(itemKey, children) {
				arr.push(itemKey);
				children.forEach(function (item) {
					if (item[childrenName]) {
						loop(getKey(item, rowKey), item[childrenName]);
					}
				});
			};
			loop(itemKey, itemData[childrenName]);
			return arr;
		}, _this.rowRenderer = function (_ref) {
			var index = _ref.index,
			    key = _ref.key,
			    style = _ref.style;
			var _this$props2 = _this.props,
			    dataSource = _this$props2.dataSource,
			    rowKey = _this$props2.rowKey,
			    columns = _this$props2.columns,
			    childrenName = _this$props2.childrenName,
			    mulCellKey = _this$props2.mulCellKey;
			var expandedKeys = _this.state.expandedKeys;

			var itemData = dataSource[index];
			return React.createElement(
				'div',
				{ key: key, style: style },
				React.createElement(BodyRowWarp, _extends({}, _this.props, {
					indexLevel: 1,
					mulCellKey: mulCellKey,
					childrenName: childrenName,
					key: getKey(itemData, function (data) {
						return rowKey(data, 'itemData');
					}),
					columns: columns,
					itemData: itemData,
					rowIndex: index,
					expandedKeys: expandedKeys,
					handleExpend: _this.handleExpend,
					pId: 0
				}))
			);
		}, _this.renderCommonView = function () {
			var _this$props3 = _this.props,
			    dataSource = _this$props3.dataSource,
			    rowKey = _this$props3.rowKey,
			    columns = _this$props3.columns,
			    childrenName = _this$props3.childrenName,
			    mulCellKey = _this$props3.mulCellKey;
			var expandedKeys = _this.state.expandedKeys;

			return dataSource.map(function (itemData, index) {
				return React.createElement(BodyRowWarp, _extends({}, _this.props, {
					indexLevel: 1,
					mulCellKey: mulCellKey,
					childrenName: childrenName,
					key: getKey(itemData, rowKey),
					columns: columns,
					itemData: itemData,
					rowIndex: index,
					expandedKeys: expandedKeys,
					handleExpend: _this.handleExpend,
					pId: 0
				}));
			});
		}, _this.renderBody = function () {
			// const { virtualized } = this.props;
			// if (virtualized) {
			// 	return this.renderVirtualView();
			// }
			return _this.renderCommonView();
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	Tbody.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var forceUpdateFlag = false;
		if (nextProps.dataSource !== this.props.dataSource) {
			forceUpdateFlag = true;
		} else if (this.props.rowSelection !== nextProps.rowSelection) {
			forceUpdateFlag = true;
		}
		if (forceUpdateFlag) {
			this.listRef && this.listRef.forceUpdateGrid();
		}
	};

	// renderVirtualView = () => {
	// 	const { dataSource } = this.props;
	// 	const self = this;
	// 	return (
	// 		<AutoSizer>
	// 			{({ width, height }) => (
	// 				<List
	// 					ref={ref => {
	// 						self.listRef = ref;
	// 					}}
	// 					width={width}
	// 					height={height}
	// 					// overscanRowCount={10}
	// 					overscanRowCount={5}
	// 					rowHeight={35}
	// 					rowCount={dataSource.length}
	// 					// rowCount={20}
	// 					rowRenderer={this.rowRenderer}
	// 				/>
	// 			)}
	// 		</AutoSizer>
	// 	);
	// };

	Tbody.prototype.render = function render() {
		var _props = this.props,
		    dataSource = _props.dataSource,
		    resized = _props.resized,
		    rowSelection = _props.rowSelection;
		// const { expandedKeys } = this.state;

		if (dataSource.length) {
			return React.createElement(
				'div',
				{
					className: 'yc-tbody no-scroll-bar-div',
					style: {
						minWidth: getRowMinWidth({ resized: resized, rowSelection: rowSelection })
					}
				},
				this.renderBody()
			);
		}
		return React.createElement(NoDataDiv, null);
	};

	return Tbody;
}(React.Component);

var defaultProps = {
    mode: 'cell'
};

var Resizer = function (_React$Component) {
    inherits(Resizer, _React$Component);

    function Resizer(props) {
        classCallCheck(this, Resizer);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.trapEvents = false;

        _this.resizeColumnEnd = function (event) {
            event.stopPropagation();
            // If its a touch event clear the mouse one's as well because sometimes
            // the mouseDown event gets called as well, but the mouseUp event doesn't
            _this.trapEvents = false;
            window.removeEventListener('mousemove', _this.resizeColumnMoving);
            window.removeEventListener('mouseup', _this.resizeColumnEnd);
            window.removeEventListener('mouseleave', _this.resizeColumnEnd);

            // The touch events don't propagate up to the sorting's onMouseDown event so
            // no need to prevent it from happening or else the first click after a touch
            // event resize will not sort the column.
            _this.props.setStateWithData({
                skipNextSort: true,
                currentlyResizing: {}
            });
        };

        _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
        _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);
        return _this;
    }

    Resizer.prototype.resizeColumnStart = function resizeColumnStart(event) {
        var _this2 = this;

        console.log('l am start...');
        event.stopPropagation();
        event.preventDefault();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;
        var _props = this.props,
            column = _props.column,
            setStateWithData = _props.setStateWithData;
        var pageX = event.pageX;

        // const { trapEvents } = this;

        setStateWithData({
            currentlyResizing: {
                key: column.key,
                startX: pageX,
                parentWidth: parentWidth
            }
        }, function () {
            if (_this2.trapEvents) {
                return;
            }
            _this2.trapEvents = true;
            window.addEventListener('mousemove', _this2.resizeColumnMoving);
            window.addEventListener('mouseup', _this2.resizeColumnEnd);
            window.addEventListener('mouseleave', _this2.resizeColumnEnd);
        });
    };

    Resizer.prototype.resizeColumnMoving = function resizeColumnMoving(event) {
        event.stopPropagation();
        console.log('trapEvents:', this.trapEvents);
        if (!this.trapEvents) {
            return;
        }
        var _props2 = this.props,
            currentlyResizing = _props2.currentlyResizing,
            setStateWithData = _props2.setStateWithData,
            columns = _props2.columns,
            resized = _props2.resized,
            column = _props2.column,
            pColumn = _props2.pColumn;

        // Delete old value

        var pageX = event.pageX;

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly

        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        // 最小宽度
        // const minWidth = (column.styles || {}).minWidth || MIN_WIDTH
        var minWidth = GARG_MIN_WIDTH;
        if (newWidth < minWidth) {
            return;
        }
        setStateWithData({
            resized: genResize({
                column: column,
                columns: columns,
                pColumn: pColumn, // is mul cell parent columns
                resized: resized,
                newWidth: genWidthVal(newWidth),
                currentlyResizing: currentlyResizing
            })
        });
    };

    /**
     * 移除监听事件
     */


    Resizer.prototype.render = function render() {
        return React.createElement('div', { onMouseDown: this.resizeColumnStart, className: 'yc-thead-resizer' });
    };

    return Resizer;
}(React.Component);

Resizer.defaultProps = defaultProps;

var Sort = function (_React$Component) {
    inherits(Sort, _React$Component);

    function Sort(props) {
        classCallCheck(this, Sort);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _initialiseProps.call(_this);

        var column = props.column;

        _this.state = {
            sortOrder: column.sortOrder || 'ascend'
        };
        return _this;
    }

    Sort.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.column.sortOrder) {
            if (nextProps.column.sortOrder !== this.state.sortOrder) {
                // this.setState({
                //     sortOrder: nextProps.column.sortOrder,
                // });
            }
        }
    };

    Sort.prototype.render = function render() {
        var _this2 = this;

        var column = this.props.column;
        var sortOrder = this.state.sortOrder;

        var isAscend = sortOrder === 'ascend';
        var isDescend = sortOrder === 'descend';
        return React.createElement(
            'div',
            { className: 'yc-thead-sort' },
            isAscend && React.createElement(antd.Icon, {
                className: 'yc-column-sorter-up',
                type: 'up',
                onClick: function onClick() {
                    _this2.toggleSortOrder('descend', column);
                }
            }),
            isDescend && React.createElement(antd.Icon, {
                className: 'yc-column-sorter-down',
                type: 'down',
                onClick: function onClick() {
                    _this2.toggleSortOrder('ascend', column);
                }
            })
        );
    };

    return Sort;
}(React.Component);

/**
 *
 * @param {*} props
 * 表头的排序
 */


var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.toggleSortOrder = function (order, column) {
        var onChange = _this3.props.onChange;

        _this3.setState({
            sortOrder: order
        });
        if (onChange) {
            var params = {
                column: column,
                order: order,
                columnKey: column.dataIndex
            };
            onChange({}, {}, params);
        }
    };
};

function HCell(props) {
    var title = props.title,
        column = props.column,
        _props$styles = props.styles,
        styles = _props$styles === undefined ? {} : _props$styles,
        curResizedObj = props.curResizedObj;

    var isSortCol = column.sorter;
    return React.createElement(
        'div',
        { style: getCellWidthStyl({ curResizedObj: curResizedObj, styles: styles }), className: 'yc-thead-cell' },
        typeof title === 'function' ? title() : title,
        isSortCol && React.createElement(Sort, props),
        React.createElement(Resizer, props)
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
    var columns = props.columns,
        column = props.column,
        fatherTitle = props.fatherTitle,
        isLastCol = props.isLastCol,
        dataIndex = props.dataIndex,
        curResizedObj = props.curResizedObj,
        rest = objectWithoutProperties(props, ['columns', 'column', 'fatherTitle', 'isLastCol', 'dataIndex', 'curResizedObj']);
    var resized = rest.resized;

    var siblingTitleArr = column.children;
    return React.createElement(
        'div',
        {
            style: getCellGroupStyl({ siblingTitleArr: siblingTitleArr, resized: resized }),
            className: 'yc-thead-cell-group-warp'
        },
        React.createElement(
            'div',
            { className: 'yc-thead-cell-top ' + (isLastCol ? 'overflow-hidden-cont' : '') },
            column.title,
            React.createElement(Resizer, _extends({}, props, { mode: 'cellGroup' }))
        ),
        React.createElement(
            'div',
            { className: 'yc-thead-cell-group' },
            siblingTitleArr.map(function (item) {
                return React.createElement(HCell, _extends({}, rest, item, {
                    key: item.key,
                    column: item,
                    pColumn: column,
                    curResizedObj: resized.find(function (it) {
                        return it.key === item.key;
                    })
                }));
            })
        )
    );
}

function HCol(props) {
    var column = props.column,
        columns = props.columns;

    var isLastCol = isLastChild(columns, column);
    if (column.children) {
        return React.createElement(HCellGroup, _extends({}, props, { isLastCol: isLastCol }));
    }
    return React.createElement(HCell, _extends({}, props, { isLastCol: isLastCol }));
}

function getCheckAllVal(_ref) {
    var selectedRowKeys = _ref.selectedRowKeys,
        canCheckAllNestKeys = _ref.canCheckAllNestKeys;

    return canCheckAllNestKeys.length && canCheckAllNestKeys.every(function (item) {
        return selectedRowKeys.includes(item);
    });
}

function HSelectCellChildren(props) {
    var rowSelection = props.rowSelection,
        dataSource = props.dataSource,
        rowKey = props.rowKey,
        childrenName = props.childrenName,
        mode = props.mode;
    var onChange = rowSelection.onChange,
        selectedRowKeys = rowSelection.selectedRowKeys,
        getCheckboxProps = rowSelection.getCheckboxProps;

    var getAllCheckedParams = {
        dataSource: dataSource,
        childrenName: childrenName,
        rowKey: rowKey,
        getCheckboxProps: getCheckboxProps
    };

    var canCheckAllNestKeys = getCanCheckAllNestKeys(getAllCheckedParams);

    var checkedVal = getCheckAllVal({
        selectedRowKeys: selectedRowKeys,
        canCheckAllNestKeys: canCheckAllNestKeys,
        getCheckboxProps: getCheckboxProps,
        rowKey: rowKey
    });

    function handleSelectAllChange(e) {
        var checked = e.target.checked;

        var usedRowKeys = [];
        if (checked) {
            usedRowKeys = canCheckAllNestKeys;
        }
        onChange(usedRowKeys);
    }

    var checkProps = {
        checked: checkedVal,
        onChange: handleSelectAllChange
    };

    return React.createElement(antd.Checkbox, checkProps);
}

/**
 * 单选表头不显示
 * @param {*} props
 */
function HSelectCell(props) {
    var rowSelection = props.rowSelection;
    var mode = rowSelection.mode;


    return React.createElement(
        'div',
        {
            className: 'yc-thead-cell yc-thead-select-cell',
            style: {
                width: SELECT_CELL_WIDTH,
                minWidth: SELECT_CELL_WIDTH,
                maxWidth: SELECT_CELL_WIDTH
            }
        },
        mode !== 'single' && React.createElement(HSelectCellChildren, props)
    );
}

function Thead(props) {
    var columns = props.columns,
        resized = props.resized,
        rowSelection = props.rowSelection;


    return React.createElement(
        'div',
        {
            className: 'yc-thead-warp',
            style: { minWidth: getRowMinWidth({ resized: resized, rowSelection: rowSelection }) }
        },
        React.createElement(
            'div',
            { className: 'yc-thead' },
            rowSelection && React.createElement(HSelectCell, props),
            columns.map(function (column) {
                return React.createElement(HCol, _extends({
                    key: column.key
                }, column, {
                    column: column
                }, props, {
                    curResizedObj: resized.find(function (it) {
                        return it.key === column.key;
                    })
                }));
            })
        )
    );
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".yc-table {\n  width: 100%;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  overflow: auto;\n  border: 1px solid #d9d9d9;\n}\n.yc-table .yc-thead-warp {\n  background: #f4f4f4;\n}\n.yc-table .yc-thead-warp .yc-thead {\n  display: flex;\n  flex-direction: row;\n  font-size: 13px;\n  min-height: 35px;\n  border-bottom: 1px solid #d9d9d9;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell-group-warp {\n  border-left: 1px solid #d9d9d9;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell-group-warp .yc-thead-cell-top {\n  height: 25px;\n  user-select: none;\n  border-bottom: 1px solid #d9d9d9;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell-group-warp .yc-thead-cell-group {\n  height: 30px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-resizer {\n  position: absolute;\n  width: 18px;\n  top: 0;\n  bottom: 0;\n  right: -9px;\n  cursor: col-resize;\n  z-index: 10;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell {\n  -webkit-user-select: none;\n  user-select: none;\n  display: flex;\n  border-left: 1px solid #d9d9d9;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell:first-child {\n  border-left: 0px;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell:last-child {\n  overflow: hidden;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell .yc-thead-sort {\n  display: flex;\n  flex-direction: column;\n  margin-left: 10px;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell .yc-thead-sort .yc-column-sorter-up {\n  cursor: pointer;\n}\n.yc-table .yc-thead-warp .yc-thead .yc-thead-cell .yc-thead-sort .yc-column-sorter-down {\n  cursor: pointer;\n}\n.yc-table .yc-tbody {\n  flex: 1;\n  font-size: 12px;\n  background: #fff;\n  overflow-y: auto;\n}\n.yc-table .yc-tbody .yc-tbody-row {\n  display: flex;\n  flex-direction: row;\n  border-bottom: 1px solid #d9d9d9;\n  min-height: 35px;\n}\n.yc-table .yc-tbody .yc-tbody-row:hover {\n  background: #fefaef;\n}\n.yc-table .yc-tbody .yc-tbody-row:hover .yc-tbody-row-cell:nth-child(2),\n.yc-table .yc-tbody .yc-tbody-row:hover .yc-tbody-row-cell:nth-child(8) {\n  text-decoration: underline;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell {\n  border-left: 1px solid #d9d9d9;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell .yc-tbody-row-cell-line {\n  line-height: 34px;\n  height: 34px;\n  border-bottom: 1px solid #d9d9d9;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  padding: 0px 5px;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell .yc-tbody-row-cell-line:last-child {\n  border-bottom: 0;\n  height: 33px;\n  line-height: 33px;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell-no-line {\n  border-left: 1px solid #d9d9d9;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell-no-line:nth-child(1) {\n  border-left: 0;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-cell-no-line .yc-tbody-row-cell-no-line-content {\n  width: 100%;\n  padding: 0 5px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-tbody-row-select-cell {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-thead-cell-group-warp {\n  display: flex;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-thead-cell-group-warp .yc-thead-cell-group {\n  height: 30px;\n  display: flex;\n  flex-direction: row;\n}\n.yc-table .yc-tbody .yc-tbody-row .yc-thead-cell-group-warp .yc-thead-cell-group:nth-child(1) {\n  border-left: 1px solid #d9d9d9;\n}\n.overflow-hidden-cont {\n  overflow: hidden;\n}\n";
styleInject(css);

var Table = function (_React$PureComponent) {
    inherits(Table, _React$PureComponent);

    function Table(props) {
        classCallCheck(this, Table);

        var _this = possibleConstructorReturn(this, _React$PureComponent.call(this, props));

        _this.setStateWithData = function (val, cb) {
            _this.setState(_extends({}, val), function () {
                if (cb) {
                    cb && cb();
                }
            });
        };

        var initConfig = genInitConfig(props.columns);
        _this.state = _extends({
            currentlyResizing: {},
            canCheckAllNestKeys: []
        }, initConfig);
        return _this;
    }

    /**
     *
     * @param {*} nextProps
     * 当columns改变时
     */


    Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.columns !== this.props.columns) {
            var newConfig = genNewConfigByOld({
                newColumn: nextProps.columns,
                oldColumn: this.state.columns,
                oldResized: this.state.resized
            });
            if (newConfig) {
                this.setState(newConfig);
            }
        }
    };

    Table.prototype.render = function render() {
        var _props = this.props,
            _props$className = _props.className,
            className = _props$className === undefined ? '' : _props$className,
            rest = objectWithoutProperties(_props, ['className']);

        return React.createElement(
            'div',
            { className: 'yc-table ' + className },
            React.createElement(Thead, _extends({}, rest, this.state, { setStateWithData: this.setStateWithData })),
            React.createElement(Tbody, _extends({}, rest, this.state, {
                columns: this.state.flatColumns,
                setStateWithData: this.setStateWithData
            }))
        );
    };

    return Table;
}(React.PureComponent);

Table.propTypes = propTypes;

return Table;

})));
