(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('rc-select'), require('react'), require('prop-types'), require('classnames'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['rc-select', 'react', 'prop-types', 'classnames', 'react-dom'], factory) :
  (global.ytTable = factory(global.rc-select,global.React,global.PropTypes,global.classnames,global.ReactDOM));
}(this, (function (rcSelect,React,PropTypes,classnames,ReactDOM) { 'use strict';

function __$$styleInject(css, ref) {
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
React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
classnames = 'default' in classnames ? classnames['default'] : classnames;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

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

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function hoc(params) {
    return function (WarpComponent) {
        var _class, _temp2, _initialiseProps;

        return _temp2 = _class = function (_React$Component) {
            inherits(PP, _React$Component);

            function PP() {
                var _temp, _this, _ret;

                classCallCheck(this, PP);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), possibleConstructorReturn(_this, _ret);
            }

            PP.prototype.render = function render() {
                return React.createElement(WarpComponent, _extends({}, this.props, { onBlur: this.onBlur }));
            };

            return PP;
        }(React.Component), _class.contextTypes = {
            setClickedValue: PropTypes.func
        }, _initialiseProps = function _initialiseProps() {
            var _this2 = this;

            this.onBlur = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                var onBlur = _this2.props.onBlur;

                onBlur && onBlur(args);
                _this2.context.setClickedValue(false);
            };
        }, _temp2;
    };
}

var config = {
	ytTablePerfix: 'yt-table',
	canFocusType: ['select', 'input']
};

var _dec;
var _class;
var ytTablePerfix$4 = config.ytTablePerfix;
var Input = (_dec = hoc('input'), _dec(_class = function (_React$Component) {
	inherits(Input, _React$Component);

	function Input(props) {
		classCallCheck(this, Input);

		var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.onChange = function (e) {
			var _this$props = _this.props,
			    onCellChange = _this$props.onCellChange,
			    rowKey = _this$props.rowKey,
			    cellKey = _this$props.cellKey;

			var nextValue = e.target.value;
			onCellChange && onCellChange(rowKey, cellKey, nextValue);
		};

		_this.onSpanClick = function () {
			_this.setState({
				currentType: 'input'
			}, function () {
				_this.inputRef && _this.inputRef.select();
			});
		};

		_this.onBlur = function (e) {
			_this.setState({
				currentType: 'text'
			});
			var onBlur = _this.props.onBlur;

			onBlur && onBlur(e);
			// const { setClickedValue } = this.props
			// setClickedValue && setClickedValue(false)
		};

		_this.handleFocus = function (e) {};

		_this.state = {
			currentType: 'text'
		};
		return _this;
	}

	Input.prototype.render = function render() {
		var _this2 = this;

		var value = this.props.value;
		var currentType = this.state.currentType;

		var result = React.createElement(
			'span',
			{
				className: ytTablePerfix$4 + '-cell-span',
				style: {
					width: '100%',
					height: '100%',
					display: 'inline-block'
				},
				onClick: this.onSpanClick
			},
			value
		);
		if (currentType == 'input') {
			result = React.createElement('input', {
				className: ytTablePerfix$4 + '-cell-input',
				ref: function ref(_ref) {
					_this2.inputRef = _ref;
				},
				onFocus: this.handleFocus,
				onChange: this.onChange,
				value: value,
				onBlur: this.onBlur,
				type: 'text'
			});
		}
		return result;
	};

	return Input;
}(React.Component)) || _class);

function getOffset(node) {
    var position = node.getBoundingClientRect();
    console.log('position: ', position);
}

var Portal = function (_React$Component) {
	inherits(Portal, _React$Component);

	function Portal() {
		classCallCheck(this, Portal);
		return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Portal.prototype.componentDidMount = function componentDidMount() {
		this.createContainer();
	};

	Portal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		var didUpdate = this.props.didUpdate;

		if (didUpdate) {
			didUpdate(prevProps);
		}
	};

	Portal.prototype.componentWillUnmount = function componentWillUnmount() {
		this.removeContainer();
	};

	Portal.prototype.createContainer = function createContainer() {
		this._container = this.props.getContainer();
		this.forceUpdate();
	};

	Portal.prototype.removeContainer = function removeContainer() {
		if (this._container) {
			this._container.parentNode.removeChild(this._container);
		}
	};

	Portal.prototype.render = function render() {
		if (this._container) {
			return ReactDOM.createPortal(this.props.children, this._container);
		}
		return null;
	};

	return Portal;
}(React.Component);

Portal.propTypes = {
	getContainer: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	didUpdate: PropTypes.func
};

var Trigger = function (_React$Component) {
	inherits(Trigger, _React$Component);

	function Trigger() {
		classCallCheck(this, Trigger);
		return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Trigger.prototype.getContainer = function getContainer() {
		var props = this.props;

		var popupContainer = document.createElement('div');
		popupContainer.style.position = 'absolute';
		popupContainer.style.top = '0';
		popupContainer.style.left = '0';
		popupContainer.style.width = '100%';
		var mountNode = window.document.body;
		mountNode.appendChild(popupContainer);
		return popupContainer;
	};

	Trigger.prototype.render = function render() {
		var children = this.props.children;

		return React.createElement(Portal, {
			key: 'protal',
			getContainer: this.getContainer,
			children: children
		});
	};

	return Trigger;
}(React.Component);

var css = ".yt-select {\n  height: 30px;\n  line-height: 30px;\n  width: 100%;\n  border: 1px solid #d9d9d9;\n  position: relative;\n  display: inline-block;\n}\n.yt-select-drop-down {\n  position: absolute;\n  z-index: 999;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  top: 32px;\n  background: white;\n  border-color: #40a9ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.yt-select-drop-down .yt-select-drop-down-item {\n  padding: 0 12px;\n  line-height: 32px;\n  height: 32px;\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 12px;\n}\n.yt-select-drop-down .yt-select-drop-down-item:hover {\n  background: #e6f7ff;\n}\n.yt-select-drop-down .yt-select-drop-down-active-item {\n  background: #e6f7ff;\n}\n.yt-select-focused {\n  border: 1px solid #40a9ff;\n}\n.yt-select-display-none {\n  display: none;\n}\nli {\n  list-style-type: none;\n}\n";
__$$styleInject(css);

var prefix = 'yt-select';

var Select = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.setFocused = function (val) {
			return _this.setState({ focused: val });
		};

		_this.handleFocus = function () {
			// if (this.state.focused) {
			// 	return
			// }
			// this.setFocused(true)
			_this.setState({
				dropDownShow: true,
				focused: true
			});
		};

		_this.focused = false;

		_this.handleClick = function () {
			if (_this.focused) {
				_this.setState({
					dropDownShow: !_this.state.dropDownShow
				});
				getOffset;
			}
			_this.focused = true;
		};

		_this.handleBlur = function (e) {
			// this.setFocused(false)
			var onBlur = _this.props.onBlur;

			_this.focused = false;
			_this.setState({
				focused: false,
				dropDownShow: false
			});
			onBlur && onBlur(e);
		};

		_this.handleKeyDown = function (e) {
			var _this$state = _this.state,
			    dataLen = _this$state.dataLen,
			    activeIndex = _this$state.activeIndex,
			    focused = _this$state.focused,
			    dropDownShow = _this$state.dropDownShow;
			// up 38 down 40

			if (dataLen === 0) return;
			if (!dropDownShow) {
				_this.setState({
					dropDownShow: true
				});
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			if (e.keyCode == 38 || e.keyCode == 40) {
				_this.setState({
					activeIndex: (activeIndex + (e.keyCode - 39)) % dataLen
				});
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.keyCode === 13) {
				var option = _this.props.children[activeIndex];
				var value = option.props.value;
				_this.onSelect(value, option);
			}
		};

		_this.onSelect = function (val, option) {
			console.error('?????????');
			var onSelect = _this.props.onSelect;

			_this.setState({
				dropDownShow: false
			});
			onSelect && onSelect(val, option);
			if ('value' in _this.props) {} else {
				_this.setState({
					value: val
				});
			}
		};

		_this.state = {
			focused: false,
			activeIndex: 1,
			dataLen: (props.children || []).length,
			value: props.value || '',
			dropDownShow: false
		};
		return _this;
	}

	Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _nextProps$children = nextProps.children,
		    children = _nextProps$children === undefined ? [] : _nextProps$children;

		if (children.length !== (this.props.children || []).length) {
			this.setState({ dataLen: children.length });
		}
		if ('value' in this.props) {
			this.setState({
				value: this.props.value
			});
		}
	};

	// 暂时不用
	Select.prototype.renderChild = function renderChild() {
		var _dropDownCls;

		var _props = this.props,
		    children = _props.children,
		    _props$style = _props.style,
		    style = _props$style === undefined ? {} : _props$style;
		var _state = this.state,
		    focused = _state.focused,
		    activeIndex = _state.activeIndex,
		    dropDownShow = _state.dropDownShow;

		var dropDownCls = (_dropDownCls = {}, _dropDownCls[prefix + '-drop-down'] = true, _dropDownCls[prefix + '-display-none'] = !dropDownShow, _dropDownCls);
		var getOptionItemCls = function getOptionItemCls(index) {
			var _ref;

			return _ref = {}, _ref[prefix + '-drop-down-item'] = true, _ref[prefix + '-drop-down-active-item'] = index === activeIndex, _ref;
		};
		var self = this;
		return React.createElement(
			Trigger,
			null,
			React.createElement(
				'ul',
				{ style: {}, className: classnames(dropDownCls), role: 'menu' },
				React.Children.map(children, function (child, index) {
					var props = child.props;
					var value = props.value;

					return React.createElement(
						'li',
						{
							role: 'menuitem',
							className: classnames(getOptionItemCls(index)),
							onClick: function onClick() {
								console.error('option click');
								self.onSelect(value, child);
							}
						},
						child
					);
				})
			)
		);
	};

	Select.prototype.render = function render() {
		var _containerCls,
		    _dropDownCls2,
		    _this2 = this;

		var _props2 = this.props,
		    children = _props2.children,
		    _props2$style = _props2.style,
		    style = _props2$style === undefined ? {} : _props2$style;
		var _state2 = this.state,
		    focused = _state2.focused,
		    activeIndex = _state2.activeIndex,
		    dropDownShow = _state2.dropDownShow;

		var value = 'value' in this.props ? this.props.value : this.state.value;
		var getOptionItemCls = function getOptionItemCls(index) {
			var _ref2;

			return _ref2 = {}, _ref2[prefix + '-drop-down-item'] = true, _ref2[prefix + '-drop-down-active-item'] = index === activeIndex, _ref2;
		};
		var containerCls = (_containerCls = {}, _containerCls[prefix] = true, _containerCls[prefix + '-focused'] = focused, _containerCls);
		var dropDownCls = (_dropDownCls2 = {}, _dropDownCls2[prefix + '-drop-down'] = true, _dropDownCls2[prefix + '-display-none'] = !dropDownShow, _dropDownCls2);
		var self = this;
		return React.createElement(
			'div',
			{
				onKeyDown: this.handleKeyDown,
				onClick: this.handleClick,
				tabIndex: '-1',
				ref: function ref(_ref3) {
					return _this2.selectRef = _ref3;
				},
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				className: classnames(containerCls),
				style: style
			},
			value,
			React.createElement(
				'ul',
				{ style: {}, className: classnames(dropDownCls), role: 'menu' },
				React.Children.map(children, function (child, index) {
					var props = child.props;
					var value = props.value;

					return React.createElement(
						'li',
						{
							role: 'menuitem',
							className: classnames(getOptionItemCls(index)),
							onClick: function onClick() {
								console.error('option click');
								self.onSelect(value, child);
							}
						},
						child
					);
				})
			)
		);
	};

	return Select;
}(React.Component);

var Option$1 = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option() {
		classCallCheck(this, Option);
		return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Option.prototype.render = function render() {
		var children = this.props.children;

		return React.createElement(
			'div',
			null,
			children
		);
	};

	return Option;
}(React.Component);

Select.Option = Option$1;

var _dec$1;
var _class$1;
var ytTablePerfix$5 = config.ytTablePerfix;


var Option = Select.Option;
// just test
var SelectCell = (_dec$1 = hoc('select'), _dec$1(_class$1 = function (_React$Component) {
	inherits(SelectCell, _React$Component);

	function SelectCell() {
		var _temp, _this, _ret;

		classCallCheck(this, SelectCell);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onChange = function (val, option) {
			var _this$props = _this.props,
			    onCellChange = _this$props.onCellChange,
			    rowKey = _this$props.rowKey,
			    cellKey = _this$props.cellKey;

			onCellChange && onCellChange(rowKey, cellKey, val, option);
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	SelectCell.prototype.render = function render() {
		var _props = this.props,
		    value = _props.value,
		    column = _props.column;
		var options = column.options;


		return React.createElement(
			Select,
			_extends({ onSelect: this.onChange }, this.props),
			options.map(function (it) {
				return React.createElement(
					Option,
					{ value: it.value, key: it.key },
					it.value
				);
			})
		);
	};

	return SelectCell;
}(React.Component)) || _class$1);

var ytTablePerfix$3 = config.ytTablePerfix;
var canFocusType = config.canFocusType;
function renderCell(record, column, props, setClickedValue) {
	var type = column.type,
	    key = column.key;

	var result = record[key];
	switch (type) {
		case 'input':
			{
				result = React.createElement(Input, _extends({}, props, {
					setClickedValue: setClickedValue,
					value: result
				}));
				break;
			}
		case 'select':
			{
				result = React.createElement(SelectCell, _extends({}, props, {
					setClickedValue: setClickedValue,
					value: result
				}));
				break;
			}
	}
	return result;
}

var TableCell = function (_React$Component) {
	inherits(TableCell, _React$Component);

	function TableCell() {
		var _temp, _this, _ret;

		classCallCheck(this, TableCell);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			clicked: false
		}, _this.chechIsCanFocusCell = function (props) {
			var column = props.column,
			    record = props.record,
			    rowIndex = props.rowIndex,
			    cellIndex = props.cellIndex;
			var width = column.width,
			    warp = column.warp,
			    render = column.render,
			    key = column.key,
			    _column$canFocus = column.canFocus,
			    canFocus = _column$canFocus === undefined ? false : _column$canFocus;

			return canFocusType.includes(column.type) || canFocus;
		}, _this.setClickedValue = function (val) {
			_this.setState({ clicked: val });
		}, _this.handleCellClick = function () {
			if (!_this.chechIsCanFocusCell(_this.props)) {
				return;
			}
			if (_this.state.clicked) {
				return;
			}
			_this.setClickedValue(true);
		}, _this.handleBlur = function () {
			// if (this.chechIsCanFocusCell(this.props)) {
			//     setTimeout(() => {
			//         this.setClickedValue(false)
			//     })
			//     // this.setClickedValue(false)
			// }
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	TableCell.prototype.getChildContext = function getChildContext() {
		return {
			setClickedValue: this.setClickedValue
		};
	};

	// do not need set false because it child will do it


	TableCell.prototype.render = function render() {
		var _rowCellCls;

		var props = this.props;
		var column = props.column,
		    record = props.record,
		    rowIndex = props.rowIndex,
		    cellIndex = props.cellIndex;
		var width = column.width,
		    warp = column.warp,
		    render = column.render,
		    key = column.key,
		    canFocus = column.canFocus;
		var clicked = this.state.clicked;

		var checkChildCanFocus = canFocusType.includes(column.type) || canFocus;
		var rowCellCls = (_rowCellCls = {}, _rowCellCls[ytTablePerfix$3 + '-row-cell'] = true, _rowCellCls[ytTablePerfix$3 + '-can-focus-cell'] = checkChildCanFocus, _rowCellCls[ytTablePerfix$3 + '-active-cell'] = clicked, _rowCellCls);

		return React.createElement(
			'div',
			_extends({
				onClick: this.handleCellClick
			}, checkChildCanFocus ? { tabIndex: '-1' } : {}, {
				onBlur: this.handleBlur,
				className: classnames(rowCellCls),
				key: key
			}),
			React.createElement(
				'div',
				{
					className: ytTablePerfix$3 + '-row-cell-content ' + (warp ? ytTablePerfix$3 + '-warp' : ytTablePerfix$3 + '-nowarp')
				},
				render ? render(record[key], record) : renderCell(record, column, props, this.setClickedValue)
			)
		);
	};

	return TableCell;
}(React.Component);

TableCell.childContextTypes = {
	setClickedValue: PropTypes.func
};

var ytTablePerfix$2 = config.ytTablePerfix;

var TableRow = function (_React$PureComponent) {
	inherits(TableRow, _React$PureComponent);

	function TableRow() {
		var _temp, _this, _ret;

		classCallCheck(this, TableRow);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRowClick = function (e) {
			var _this$props = _this.props,
			    changeCurrentRowKey = _this$props.changeCurrentRowKey,
			    rowKey = _this$props.rowKey,
			    handleRowClick = _this$props.handleRowClick;

			changeCurrentRowKey(rowKey);
			handleRowClick && handleRowClick(rowKey);
		}, _this.handleDoubleRowClick = function (e) {
			var _this$props2 = _this.props,
			    changeCurrentRowKey = _this$props2.changeCurrentRowKey,
			    rowKey = _this$props2.rowKey,
			    handleDoubleRowClick = _this$props2.handleDoubleRowClick;

			changeCurrentRowKey(rowKey);
			handleDoubleRowClick && handleDoubleRowClick(rowKey);
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	TableRow.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    record = _props.record,
		    columns = _props.columns,
		    rowKey = _props.rowKey,
		    currentRowKey = _props.currentRowKey;

		var isSelectedRow = rowKey === currentRowKey;
		return React.createElement(
			'div',
			{
				onClick: this.handleRowClick,
				onDoubleClick: this.handleDoubleRowClick,
				className: ytTablePerfix$2 + '-row ' + (isSelectedRow ? ytTablePerfix$2 + '-selected-row' : '')
			},
			columns.map(function (column, index) {
				return React.createElement(TableCell, _extends({}, _this2.props, {
					cellKey: column.key,
					key: column.key,
					cellIndex: index,
					column: column
				}));
			})
		);
	};

	return TableRow;
}(React.PureComponent);

var ytTablePerfix$1 = config.ytTablePerfix;

var TableBody = function (_React$Component) {
    inherits(TableBody, _React$Component);

    function TableBody(props) {
        classCallCheck(this, TableBody);

        var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.changeCurrentRowKey = function (val, callback) {
            _this.setState({
                currentRowKey: val
            }, function () {
                callback && callback();
            });
        };

        _this.state = {
            currentRowKey: -1
        };
        return _this;
    }

    TableBody.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            dataSource = _props.dataSource,
            getRowKey = _props.getRowKey,
            columns = _props.columns;
        var currentRowKey = this.state.currentRowKey;

        return React.createElement(
            'div',
            { className: ytTablePerfix$1 + '-tbody' },
            dataSource.map(function (record, index) {
                return React.createElement(TableRow, _extends({}, _this2.props, {
                    currentRowKey: currentRowKey,
                    key: getRowKey(record),
                    rowKey: getRowKey(record),
                    record: record,
                    rowIndex: index,
                    changeCurrentRowKey: _this2.changeCurrentRowKey
                }));
            })
        );
    };

    return TableBody;
}(React.Component);

var ytTablePerfix$6 = config.ytTablePerfix;


function TableHeader(props) {
	var columns = props.columns,
	    theadHeight = props.theadHeight;

	var usedColumns = [].concat(columns);
	return React.createElement(
		'div',
		{ className: ytTablePerfix$6 + '-thead' },
		columns.map(function (item) {
			var key = item.key,
			    title = item.title,
			    width = item.width,
			    render = item.render,
			    _item$fatherTitle = item.fatherTitle,
			    fatherTitle = _item$fatherTitle === undefined ? {} : _item$fatherTitle;

			if (fatherTitle.title) {
				var subArr = columns.filter(function (column) {
					return (column.fatherTitle || {}).title == fatherTitle.title;
				});
				var index = subArr.findIndex(function (it) {
					return it.key === key;
				});
				if (index === 0) {
					return React.createElement(
						'div',
						{
							className: ytTablePerfix$6 + '-thead-cell-mul ' + ytTablePerfix$6 + '-last-child-no-border',
							key: key,
							style: {
								flex: subArr.length
							}
						},
						React.createElement(
							'div',
							{
								className: ytTablePerfix$6 + '-thead-cell-mul-top ' + ytTablePerfix$6 + '-up-down-center'
							},
							title
						),
						React.createElement(
							'div',
							{
								className: ytTablePerfix$6 + '-thead-cell-mul-bottom'
							},
							subArr.map(function (ele) {
								return React.createElement(
									'div',
									{
										key: ele.key,
										className: ytTablePerfix$6 + '-thead-cell-mul-bottom-item ' + ytTablePerfix$6 + '-up-down-center'
									},
									ele.title
								);
							})
						)
					);
				} else {
					return null;
				}
			}
			return React.createElement(
				'div',
				{
					className: ytTablePerfix$6 + '-thead-cell ' + ytTablePerfix$6 + '-last-child-no-border ' + ytTablePerfix$6 + '-up-down-center',
					key: key,
					style: {}
				},
				title
			);
		})
	);
}

var css$1 = "* {\n  box-sizing: border-box;\n}\n.yt-table-container {\n  height: inherit;\n  width: auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.yt-table-container .yt-table-thead {\n  background: #f9f9f9;\n  border: 1px solid #d9d9d9;\n  display: flex;\n  flex-direction: row;\n  text-align: center;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell {\n  flex: 1;\n  min-height: 30px;\n  border-right: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul {\n  border-right: 1px solid #d9d9d9;\n  border-bottom: 0px;\n  display: flex;\n  flex-direction: column;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-top {\n  flex: 1;\n  min-height: 30px;\n  border-bottom: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom {\n  flex: 1;\n  display: flex;\n  min-height: 30px;\n  flex-direction: row;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom .yt-table-thead-cell-mul-bottom-item {\n  width: 100%;\n  border-right: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom .yt-table-thead-cell-mul-bottom-item:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-tbody {\n  flex: 1;\n  border: 1px solid #d9d9d9;\n  border-top: 0px;\n  margin-left: calc(0vw);\n  overflow: auto;\n}\n.yt-table-container .yt-table-tbody .yt-table-row {\n  border-bottom: 1px solid #d9d9d9;\n  display: flex;\n  flex-direction: row;\n}\n.yt-table-container .yt-table-tbody .yt-table-row:hover {\n  background-color: #ecf6fd;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell {\n  overflow: hidden;\n  flex: 1;\n  border-right: 1px solid #d9d9d9;\n  min-height: 30px;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell .yt-table-row-cell-content {\n  height: 100%;\n  width: 100%;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell:focus {\n  outline: -webkit-focus-ring-color auto 2px;\n}\n.yt-table-container .yt-table-tbody .yt-table-selected-row {\n  background: #90caf3;\n}\n.yt-table-container .yt-table-tbody .yt-table-selected-row:hover {\n  background-color: #90caf3;\n}\n.yt-table-nowarp {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.yt-table-warp {\n  word-wrap: break-word;\n}\n.yt-table-cell-span,\n.yt-table-row-cell-content {\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  line-height: 30px;\n}\n.yt-table-cell-input {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  height: 100%;\n  width: 100%;\n}\n.yt-table-cell-select {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  height: 100%;\n  width: 100%;\n  background: inherit;\n}\n.yt-table-last-child-no-border:last-child {\n  border-right: 0px !important;\n}\n.yt-table-up-down-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n*:focus {\n  outline: none;\n  border-color: #40a9ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n";
__$$styleInject(css$1);

var ytTablePerfix$7 = config.ytTablePerfix;


var triggerTableCellClick = function triggerTableCellClick(dom) {
	if (dom) {
		dom.click();
		var subSubChild = null;
		try {
			subSubChild = dom.childNodes[0].childNodes[0];
		} catch (error) {}
		if (subSubChild) {
			subSubChild.click();
			if (subSubChild.className.indexOf('select')) {
				subSubChild.click();
				subSubChild.focus();
			}
		}
	}
};

var getDomIndex = function getDomIndex(dom, selector) {
	var siblingsArr = Array.from(document.querySelectorAll(selector));
	var indexLen = siblingsArr.indexOf(dom);
	return indexLen;
};

function getCanFocusChildNodes(dom) {
	return dom && Array.from(dom.childNodes).filter(function (node) {
		return node.className.indexOf(ytTablePerfix$7 + '-can-focus-cell') > -1;
	}) || [];
}

var getNextFocus = function getNextFocus(dom, selector) {
	var pNode = dom.parentNode;
	var canFoucesArr = getCanFocusChildNodes(pNode);
	var selfIndex = canFoucesArr.indexOf(dom);
	var cfaLen = canFoucesArr.length;
	var pIndex = getDomIndex(pNode, '.' + ytTablePerfix$7 + '-row');
	var nextNode = null;
	if (selfIndex < cfaLen - 1) {
		nextNode = canFoucesArr[selfIndex + 1];
	} else {
		var nextRow = document.querySelector('.' + ytTablePerfix$7 + '-row:nth-child(' + (pIndex + 2) + ')');
		var nextRowArr = getCanFocusChildNodes(nextRow);
		nextNode = nextRowArr[0];
	}
	if (nextNode) {
		triggerTableCellClick(nextNode);
	}
};

var ytTablePerfix = config.ytTablePerfix;

var Table = function (_React$Component) {
	inherits(Table, _React$Component);

	function Table(props) {
		classCallCheck(this, Table);

		var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.handleKeyDown = function (e) {
			if (e.keyCode == 9) {
				e.preventDefault();
				var activeDom = document.querySelector('.' + ytTablePerfix + '-active-cell');
				if (!activeDom) {
					var firstCanFoucesDom = document.querySelector('.' + ytTablePerfix + '-can-focus-cell:first-child');
					firstCanFoucesDom && triggerTableCellClick(firstCanFoucesDom);
					var tbody = document.querySelector('.' + ytTablePerfix + '-tbody');
					if (tbody.scrollTop !== 0) {
						tbody.scrollTop = 0;
					}
				} else {
					getNextFocus(activeDom, '.' + ytTablePerfix + '-can-focus-cell');
				}
			}
		};

		_this.state = {};
		return _this;
	}

	Table.prototype.componentWillUnmount = function componentWillUnmount() {};

	Table.prototype.render = function render() {
		return React.createElement(
			'div',
			{ onKeyDown: this.handleKeyDown, className: 'yt-table-container' },
			React.createElement(TableHeader, this.props),
			React.createElement(TableBody, this.props)
		);
	};

	return Table;
}(React.Component);

Table.propTypes = {
	getRowKey: PropTypes.func.isRequired,
	columns: PropTypes.array.isRequired,
	dataSource: PropTypes.array.isRequired
};

Table.Select = Select;
// Table.Select = RCSelect
// RCSelect.Option = Option
// Table.RCSelect = RCSelect

return Table;

})));