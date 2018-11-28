(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('antd')) :
	typeof define === 'function' && define.amd ? define(['react', 'antd'], factory) :
	(global.ytTable = factory(global.React,global.antd));
}(this, (function (React,antd) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */





function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

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











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* eslint-disable */
/**
 *
 * @param {*} item
 * 有关width minWidth maxWidth的
 * 1. 在styles中width
 * 2. 在column中的width
 * 3. 如果之传入width 根据MIN_WIDTH计算对应的flexItem
 */
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
            var oldResizedItem = oldResized.find(function (it) {
                return it.key === item.key;
            });
            if (oldResizedItem && oldResizedItem.value) {
                return oldResizedItem;
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
                    flatColumns: newConfig.flatColumns,
                    resized: oldResized
                };
            }
            return genInitConfig(newColumn);
        }
    }
    return null;
}
function getFlatColumns(columns) {
    var initArr = [];
    return columns.reduce(function (pre, cur) {
        var children = cur.children;

        if (children) {
            return pre.concat(children);
        }
        return pre.concat([cur]);
    }, initArr);
}
function genResizeByFlatCol(_ref3) {
    var currentlyResizing = _ref3.currentlyResizing,
        newWidth = _ref3.newWidth,
        resized = _ref3.resized;

    return resized.map(function (item) {
        if (item.key === currentlyResizing.key) {
            return Object.assign({}, item, { value: newWidth });
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
        return Object.assign({}, resize, { value: genWidthVal(calcVal) });
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
    var newWidth = _ref5.newWidth,
        resized = _ref5.resized,
        column = _ref5.column;

    var children = column.children;
    function checkIsChildResizeCb(item) {
        return children.find(function (child) {
            return item.key === child.key;
        });
    }
    var subResized = resized.filter(checkIsChildResizeCb);
    var subResizedLen = subResized.length;
    var oldCellGroupStyl = getCellGroupStyl({
        siblingTitleArr: children,
        resized: resized
    });
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

    var pChildren = pColumn && pColumn.children || [];
    if (pChildren.length === 0) {
        return;
    }
    var curResizd = resized.find(function (it) {
        return it.key === currentlyResizing.key;
    });
    return resized.map(function (item) {
        var isSiblingCol = pChildren.find(function (it) {
            return it.key === item.key;
        });
        if (curResizd === item) {
            return Object.assign({}, item, { value: newWidth, minWidth: newWidth });
        } else if (isSiblingCol) {
            var value = item.value,
                minWidth = item.minWidth,
                flexItem = item.flexItem;

            if (!value && !minWidth && curResizd) {
                var itemWidth = flexItem / curResizd.flexItem * newWidth;
                return Object.assign({}, item, { value: itemWidth, minWidth: itemWidth });
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
        column = _ref7.column;

    var children = column.children;
    if (children && Array.isArray(children)) {
        return genResizeByNestCol({ newWidth: newWidth, resized: resized, column: column });
    } else if (isObject(pColumn)) {
        return genResizeWithSiblingCell({
            currentlyResizing: currentlyResizing,
            newWidth: newWidth,
            resized: resized,
            // column,
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
        restStyle = __rest(styles, ["minWidth"]);
    var value = curResizedObj.value,
        _curResizedObj$flexIt = curResizedObj.flexItem,
        flexItem = _curResizedObj$flexIt === undefined ? 1 : _curResizedObj$flexIt,
        key = curResizedObj.key,
        reSizedStyle = __rest(curResizedObj, ["value", "flexItem", "key"]);

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
        };
    } else if (curResizedObj.minWidth) {
        usedstyles = {
            minWidth: curResizedObj.minWidth,
            flex: curResizedObj.minWidth + ' 0 auto'
        };
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
    return Object.assign({}, restStyle, reSizedStyle, usedstyles);
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
        return !!it.value;
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
            var value = cur.minWidth || cur.width || getMinWidthByResized(cur);
            return pre + parseInt(value + '', 10);
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
function getKey(data, rowKey) {
    if (typeof rowKey === 'function') {
        return rowKey(data);
    }
    return data[rowKey];
}
/**
 *
 * @param {*} param0
 * 获取能被勾选的 嵌套的CheckBox key
 */
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
 * 渲染成功之后微调样式 针对于多表头
 * @param {} rowDom
 * @param {*} config
 */

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

var defaultProps = {
    mode: 'cell'
};

var Resizer = function (_React$Component) {
    inherits(Resizer, _React$Component);

    function Resizer(props) {
        classCallCheck(this, Resizer);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.trapEvents = false;
        /**
         * 移除监听事件
         */
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
                // columns,
                pColumn: pColumn,
                resized: resized,
                newWidth: genWidthVal(newWidth),
                currentlyResizing: currentlyResizing
            })
        });
    };

    Resizer.prototype.render = function render() {
        return React.createElement("div", { onMouseDown: this.resizeColumnStart, className: "yc-thead-resizer" });
    };

    return Resizer;
}(React.Component);

Resizer.defaultProps = defaultProps;

// import { Checkbox } from 'antd';
function getCheckAllVal(_ref) {
    var selectedRowKeys = _ref.selectedRowKeys,
        canCheckAllNestKeys = _ref.canCheckAllNestKeys;

    return canCheckAllNestKeys.length && canCheckAllNestKeys.every(function (item) {
        return selectedRowKeys.includes(item);
    });
}
function HCheckbox(props) {
    var rowSelection = props.rowSelection,
        dataSource = props.dataSource,
        rowKey = props.rowKey,
        childrenName = props.childrenName;
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
    // TODO use string | number
    var checkedVal = getCheckAllVal({
        selectedRowKeys: selectedRowKeys,
        canCheckAllNestKeys: canCheckAllNestKeys
    });
    function handleSelectAllChange(e) {
        var checked = e.target.checked;

        var usedRowKeys = [];
        if (checked) {
            usedRowKeys = canCheckAllNestKeys;
        }
        onChange && onChange(usedRowKeys);
    }
    var checkProps = {
        checked: !!checkedVal,
        onChange: handleSelectAllChange
    };
    return React.createElement(antd.Checkbox, Object.assign({}, checkProps));
}
/**
 * 单选表头不显示
 * @param {*} props
 */
function HSelectCell(props) {
    var rowSelection = props.rowSelection;
    var mode = rowSelection.mode;

    return React.createElement("div", { className: "yc-thead-cell yc-thead-select-cell", style: {
            width: SELECT_CELL_WIDTH,
            minWidth: SELECT_CELL_WIDTH,
            maxWidth: SELECT_CELL_WIDTH
        } }, mode !== 'single' && React.createElement(HCheckbox, Object.assign({}, props)));
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
    var column = props.column,
        isLastCol = props.isLastCol,
        curResizedObj = props.curResizedObj,
        siblingTitleArr = props.siblingTitleArr,
        rest = __rest(props, ["column", "isLastCol", "curResizedObj", "siblingTitleArr"]);

    var resized = rest.resized;

    return React.createElement("div", { style: getCellGroupStyl({ siblingTitleArr: siblingTitleArr, resized: resized }), className: "yc-thead-cell-group-warp" }, React.createElement("div", { className: 'yc-thead-cell-top ' + (isLastCol ? 'overflow-hidden-cont' : '') }, column.title, React.createElement(Resizer, Object.assign({}, props, { mode: "cellGroup" }))), React.createElement("div", { className: "yc-thead-cell-group" }, siblingTitleArr && siblingTitleArr.map(function (item) {
        var curResizedObj = resized.find(function (it) {
            return it.key === item.key;
        });
        if (!curResizedObj) {
            return null;
        }
        return React.createElement(HCell
        // {...item} // 此处不展开 展开之后props混乱 从column取
        , Object.assign({}, rest, { key: item.key, column: item, pColumn: column, curResizedObj: curResizedObj, resized: resized }));
    })));
}
/**
 *
 * @param {*} props
 * 表头的排序
 */
function HCell(props) {
    var column = props.column,
        curResizedObj = props.curResizedObj;
    var title = column.title,
        _column$styles = column.styles,
        styles = _column$styles === undefined ? {} : _column$styles;

    if (!curResizedObj) {
        return null;
    }
    return React.createElement("div", { style: getCellWidthStyl({ curResizedObj: curResizedObj, styles: styles }), className: "yc-thead-cell" }, typeof title === 'function' ? title() : title, React.createElement(Resizer, { columns: props.columns, column: props.column, resized: props.resized, currentlyResizing: props.currentlyResizing, setStateWithData: props.setStateWithData }));
}
/**
 *
 * @param props
 */
function HCol(props) {
    var column = props.column,
        columns = props.columns;

    var isLastCol = isLastChild(columns, column);
    if (column.children) {
        return React.createElement(HCellGroup, Object.assign({}, props, { siblingTitleArr: column.children, isLastCol: isLastCol }));
    }
    return React.createElement(HCell, Object.assign({}, props, { isLastCol: isLastCol }));
}
function Thead(props) {
    var columns = props.columns,
        resized = props.resized,
        rowSelection = props.rowSelection;

    return React.createElement("div", { className: "yc-thead-warp", style: { minWidth: getRowMinWidth({ resized: resized, rowSelection: rowSelection }) } }, React.createElement("div", { className: "yc-thead" }, rowSelection && React.createElement(HSelectCell, Object.assign({}, props)), columns.map(function (column) {
        var curResizedObj = resized.find(function (it) {
            return it.key === column.key;
        });
        return React.createElement(HCol, Object.assign({}, props, { key: column.key,
            // {...column}
            column: column, curResizedObj: curResizedObj }));
    })));
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

var Table = function (_React$Component) {
    inherits(Table, _React$Component);

    function Table(props) {
        classCallCheck(this, Table);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.setStateWithData = function (val, cb) {
            _this.setState(Object.assign({}, val), function () {
                if (cb) {
                    cb && cb();
                }
            });
        };
        var initConfig = genInitConfig(props.columns);
        _this.state = Object.assign({ currentlyResizing: {
                key: '',
                startX: 0,
                parentWidth: 0
            }, canCheckAllNestKeys: [] }, initConfig);
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
        var _a = this.props,
            _a$className = _a.className,
            className = _a$className === undefined ? '' : _a$className,
            rest = __rest(_a, ["className"]);var _state = this.state,
            resized = _state.resized,
            columns = _state.columns,
            currentlyResizing = _state.currentlyResizing;

        return React.createElement("div", { className: 'yc-table ' + className }, React.createElement(Thead, Object.assign({}, rest, { resized: resized, columns: columns, setStateWithData: this.setStateWithData, currentlyResizing: currentlyResizing })));
    };

    return Table;
}(React.Component);

return Table;

})));
