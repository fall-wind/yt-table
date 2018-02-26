(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('classnames'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'classnames', 'react-dom'], factory) :
  (global.ytTable = factory(global.React,global.PropTypes,global.classnames,global.ReactDOM));
}(this, (function (React,PropTypes,classnames,ReactDOM) { 'use strict';

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

function hoc() {
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
   canFocusType: ['select', 'input'],
   defaultCellWidth: 100
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

		_this.state = {
			currentType: 'text'
		};
		return _this;
	}

	// handleFocus = e => {}

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
		if (currentType === 'input') {
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

// 递归向上查找
function contains(root, n) {
	var node = n;
	while (node) {
		if (node === root) {
			return true;
		}
		node = node.parentNode;
	}

	return false;
}

function getOffset(node) {
	var box = node.getBoundingClientRect();
	var docElem = document.documentElement;
	// < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
	return {
		left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
		top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0),
		width: box.width,
		height: box.height
	};
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
Portal.defaultProps = {
	didUpdate: function didUpdate() {}
};

// 当点击在body上的元素 select失去焦点

var Trigger = function (_React$Component) {
	inherits(Trigger, _React$Component);

	function Trigger() {
		classCallCheck(this, Trigger);
		return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Trigger.prototype.getContainer = function getContainer() {
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

		return React.createElement(
			Portal,
			{ key: 'protal', getContainer: this.getContainer },
			children
		);
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

		_this.onDocumentClick = function (e) {
			if (_this.state.focused && _this.state.dropDownShow) {
				return;
			}
			if (!contains(_this.dropDownRef) && !contains(_this.selectRef)) {
				_this.handleBlur(e);
			}
		};

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
				_this.focused = true;
			} else {
				var styleObj = getOffset(_this.selectRef);
				if (_this.dropDownRef) {
					_this.dropDownRef.style.top = styleObj.top + styleObj.height + 'px';
					_this.dropDownRef.style.left = styleObj.left + 'px';
					_this.dropDownRef.style.width = styleObj.width + 'px';
				}
			}
			_this.focused = true;
		};

		_this.handleBlur = function (e) {
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
			    dropDownShow = _this$state.dropDownShow;
			// up 38 down 40
			// const listenKeyArr = [38, 40, 13]

			if (dataLen === 0) return;
			if (e.keyCode === 38 || e.keyCode === 40) {
				if (!dropDownShow) {
					_this.setState({
						dropDownShow: true
					});
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				_this.setState({
					activeIndex: (activeIndex + (e.keyCode - 39)) % dataLen
				});
				e.preventDefault();
				e.stopPropagation();
			} else if (e.keyCode === 13) {
				var option = _this.props.children[activeIndex];
				var value = option.props.value;
				_this.onSelect(value, option);
			} else if (e.keyCode === 9) {
				_this.handleBlur(e);
			}
		};

		_this.onSelect = function (val, option) {
			var onSelect = _this.props.onSelect;

			_this.setState({
				dropDownShow: false
			});
			onSelect && onSelect(val, option);
			if (!('value' in _this.props)) {
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
			// styleObj: {},
		};
		return _this;
	}

	// .......


	Select.prototype.componentDidMount = function componentDidMount() {
		// document.addEventListener('click', this.onDocumentClick)
	};

	Select.prototype.componentWillUnmount = function componentWillUnmount() {
		// document.removeEventListener('click', this.onDocumentClick)
	};

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

	Select.prototype.render = function render() {
		var _containerCls,
		    _dropDownCls,
		    _this2 = this;

		var _props = this.props,
		    children = _props.children,
		    _props$style = _props.style,
		    style = _props$style === undefined ? {} : _props$style;
		var _state = this.state,
		    focused = _state.focused,
		    activeIndex = _state.activeIndex,
		    dropDownShow = _state.dropDownShow;

		var value = 'value' in this.props ? this.props.value : this.state.value;
		var getOptionItemCls = function getOptionItemCls(index) {
			var _ref;

			return _ref = {}, _ref[prefix + '-drop-down-item'] = true, _ref[prefix + '-drop-down-active-item'] = index === activeIndex, _ref;
		};
		var containerCls = (_containerCls = {}, _containerCls[prefix] = true, _containerCls[prefix + '-focused'] = focused, _containerCls);
		var dropDownCls = (_dropDownCls = {}, _dropDownCls[prefix + '-drop-down'] = true, _dropDownCls[prefix + '-display-none'] = !dropDownShow, _dropDownCls);
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
				onFocus: this.handleFocus
				// onBlur={this.handleBlur}
				, className: classnames(containerCls),
				style: style
			},
			value,
			React.createElement(
				Trigger,
				null,
				React.createElement(
					'ul',
					{
						ref: function ref(_ref2) {
							return _this2.dropDownRef = _ref2;
						},
						style: {
							position: 'absolute'
						},
						className: classnames(dropDownCls),
						role: 'menu'
					},
					React.Children.map(children, function (child, index) {
						// const { props } = child
						// const { value } = props
						return React.createElement(
							'li',
							{
								role: 'menuitem',
								className: classnames(getOptionItemCls(index)),
								onClick: function onClick() {
									self.onSelect(value, child);
								}
							},
							child
						);
					})
				)
			)
		);
	};

	return Select;
}(React.Component);

function Option$1 (props) {
	return React.createElement(
		'div',
		null,
		props.children
	);
}

Select.Option = Option$1;

var _dec$1;
var _class$1;
// import config from '../config'

// const { ytTablePerfix } = config

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
		var column = this.props.column;
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

var ytTablePerfix$5 = config.ytTablePerfix;


var triggerTableCellClick = function triggerTableCellClick(dom) {
	if (dom) {
		dom.click();
		var subSubChild = null;
		try {
			subSubChild = dom.childNodes[0].childNodes[0];
		} catch (error) {
			alert(error);
		}
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
		return node.className.indexOf(ytTablePerfix$5 + '-can-focus-cell') > -1;
	}) || [];
}

var getNextFocus = function getNextFocus(dom) {
	var pNode = dom.parentNode;
	var canFoucesArr = getCanFocusChildNodes(pNode);
	var selfIndex = canFoucesArr.indexOf(dom);
	var cfaLen = canFoucesArr.length;
	var pIndex = getDomIndex(pNode, '.' + ytTablePerfix$5 + '-row');
	var nextNode = null;
	if (selfIndex < cfaLen - 1) {
		nextNode = canFoucesArr[selfIndex + 1];
	} else {
		var nextRow = document.querySelector('.' + ytTablePerfix$5 + '-row:nth-child(' + (pIndex + 2) + ')');
		var nextRowArr = getCanFocusChildNodes(nextRow);
		nextNode = nextRowArr[0];
	}
	if (nextNode) {
		triggerTableCellClick(nextNode);
	}
};

function getFlexWidth(widthStr) {
	var widthPx = '' + widthStr;
	if (widthPx.indexOf('px') === -1) {
		widthPx += 'px';
	}
	return '0 0 ' + widthPx;
}

function subStrNoPx(param) {
	if (('' + param).indexOf('px') > -1) {
		return ('' + param).slice(-2);
	}
	return param;
}

function pxAdd() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return args.reduce(function (cur, pre) {
		return cur + Number(subStrNoPx(pre));
	}, 0);
}

function accArrWidth() {
	var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var keyCall = arguments[1];

	var getObjNum = function getObjNum(obj, callback) {
		var item = obj;
		if (callback) {
			item = callback(obj);
		}
		return Number(item);
	};
	return arr.reduce(function (pre, cur) {
		return pre + getObjNum(cur, keyCall);
	}, 0);
}

var ytTablePerfix$3 = config.ytTablePerfix;
var canFocusType = config.canFocusType;
function renderCell(record, column, props, setClickedValue) {
	var type = column.type,
	    key = column.key;

	var result = record[key];
	switch (type) {
		case 'input':
			{
				return React.createElement(Input, _extends({}, props, {
					setClickedValue: setClickedValue,
					value: result
				}));
			}
		case 'select':
			{
				return React.createElement(SelectCell, _extends({}, props, {
					setClickedValue: setClickedValue,
					value: result
				}));
			}
		default:
			{
				return result;
			}
	}
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
			var column = props.column;
			var _column$canFocus = column.canFocus,
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
		    record = props.record;
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
				key: key,
				style: {
					flex: getFlexWidth(width)
				}
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

// import { accArrWidth, pxAdd } from '../utils'

var ytTablePerfix$2 = config.ytTablePerfix;

var TableRow = function (_React$PureComponent) {
	inherits(TableRow, _React$PureComponent);

	function TableRow() {
		var _temp, _this, _ret;

		classCallCheck(this, TableRow);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRowClick = function () {
			var _this$props = _this.props,
			    changeCurrentRowKey = _this$props.changeCurrentRowKey,
			    rowKey = _this$props.rowKey,
			    handleRowClick = _this$props.handleRowClick;

			changeCurrentRowKey(rowKey);
			handleRowClick && handleRowClick(rowKey);
		}, _this.handleDoubleRowClick = function () {
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
		    columns = _props.columns,
		    rowKey = _props.rowKey,
		    currentRowKey = _props.currentRowKey;

		var isSelectedRow = rowKey === currentRowKey;
		return React.createElement(
			'div',
			{
				style: {
					// width: pxAdd(
					// 	accArrWidth(columns, item => item.width),
					// 	2
					// ),
					width: accArrWidth(columns, function (item) {
						return item.width;
					})
				},
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
				if (callback) {
					callback();
				}
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
			{
				style: {
					width: pxAdd(accArrWidth(columns, function (record) {
						return record.width;
					}), 1)
				},
				className: ytTablePerfix$1 + '-tbody'
			},
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

var TableHeaderCell = function (_React$Component) {
	inherits(TableHeaderCell, _React$Component);

	function TableHeaderCell() {
		var _temp, _this, _ret;

		classCallCheck(this, TableHeaderCell);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.isMouseDown = false, _this.handleMouseDown = function (e) {
			var dom = _this.cellRef;
			if (dom && contains(dom, e.target)) {
				var posObj = dom.getBoundingClientRect();
				if (posObj.right - 5 <= e.pageX && e.pageX <= posObj.right) {
					_this.isMouseDown = true;
				}
			}
		}, _this.handleMouseUp = function () {
			var _this$props = _this.props,
			    setColumns = _this$props.setColumns,
			    columnKey = _this$props.columnKey,
			    columns = _this$props.columns;

			var dom = _this.cellRef;
			if (dom && _this.isMouseDown) {
				var posObj = dom.getBoundingClientRect();
				var width = posObj.width;
				// 设置column

				var useColumns = columns.map(function (item) {
					if (item.key === columnKey) {
						return _extends({}, item, {
							width: width
						});
					}
					return item;
				});
				setColumns(useColumns);
			}
			_this.isMouseDown = false;
		}, _this.handleMouseMove = function (e) {
			var dom = _this.cellRef;
			if (_this.isMouseDown && dom) {
				var posObj = dom.getBoundingClientRect();
				// const width = `${e.pageX - posObj.left}px`;
				dom.style.flex = '0 0 ' + (e.pageX - posObj.left) + 'px';
			}
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	TableHeaderCell.prototype.componentDidMount = function componentDidMount() {
		window.addEventListener('mouseup', this.handleMouseUp);
		window.addEventListener('mousedown', this.handleMouseDown);
		window.addEventListener('mousemove', this.handleMouseMove);
	};

	TableHeaderCell.prototype.componentWillUnmount = function componentWillUnmount() {
		window.removeEventListener('mouseup', this.handleMouseUp);
		window.removeEventListener('mousedown', this.handleMouseUp);
		window.removeEventListener('mousemove', this.handleMouseMove);
	};

	TableHeaderCell.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    className = _props.className,
		    style = _props.style;

		return React.createElement(
			'div',
			{
				style: style,
				ref: function ref(_ref) {
					return _this2.cellRef = _ref;
				}
				// draggable
				// onMouseDown={this.handleMouseDown}
				// onMouseUp={this.handleMouseUp}
				// onMouseMove={this.handleMouseMove}
				, className: className
			},
			this.props.children
		);
	};

	return TableHeaderCell;
}(React.Component);

var ytTablePerfix$6 = config.ytTablePerfix;
var defaultCellWidth = config.defaultCellWidth;
function getUseArr(columns) {
	var columsObj = {};
	var useArr = [];
	columns.forEach(function (column) {
		if (column.fatherTitle) {
			if (!columsObj[column.fatherTitle.title]) {
				try {
					var subCols = columns.filter(function (item) {
						return (item.fatherTitle || {}).title === column.fatherTitle.title;
					});
					columsObj[column.fatherTitle.title] = subCols;
					var fatherWidth = subCols.reduce(function (pre, cur) {
						return pre + (cur.width || defaultCellWidth);
					}, 0);
					useArr.push({
						key: column.fatherTitle.title,
						title: column.fatherTitle.title,
						isFather: true,
						subCols: subCols,
						width: fatherWidth
					});
				} catch (error) {
				}
			}
		} else {
			useArr.push(column);
		}
	});
	return useArr;
}

function TableHeader(props) {
	var _subCellCls;

	var columns = props.columns,
	    draggable = props.draggable;

	var getHeaderCellCls = function getHeaderCellCls() {
		var _ref;

		var isMul = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
		var dragValue = arguments[1];

		return _ref = {}, _ref[ytTablePerfix$6 + '-thead-cell-mul'] = isMul, _ref[ytTablePerfix$6 + '-thead-cell'] = !isMul, _ref[ytTablePerfix$6 + '-up-down-center'] = !isMul, _ref[ytTablePerfix$6 + '-thead-cell-draggable'] = !isMul && dragValue, _ref;
	};
	var subCellCls = (_subCellCls = {}, _subCellCls[ytTablePerfix$6 + '-thead-cell-mul-bottom-item'] = true, _subCellCls[ytTablePerfix$6 + '-up-down-center'] = true, _subCellCls[ytTablePerfix$6 + '-thead-cell-draggable'] = true, _subCellCls);
	var useArr = getUseArr(columns);
	var theadWidth = useArr.reduce(function (pre, cur) {
		return pre + cur.width || defaultCellWidth;
	}, 0);
	return React.createElement(
		'div',
		{
			style: {
				width: pxAdd(theadWidth, 1)
			},
			className: ytTablePerfix$6 + '-thead'
		},
		useArr.map(function (item) {
			var key = item.key,
			    title = item.title,
			    width = item.width;

			if (item.isFather) {
				var subCols = item.subCols;
				return React.createElement(
					'div',
					{
						className: classnames(getHeaderCellCls(true, draggable)),
						key: item,
						style: {
							flex: getFlexWidth(width)
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
						subCols.map(function (ele) {
							return React.createElement(
								TableHeaderCell,
								_extends({}, props, {
									key: ele.key,
									columnKey: ele.key,
									style: {
										flex: getFlexWidth(ele.width || defaultCellWidth)
									},
									className: classnames(subCellCls)
								}),
								ele.title
							);
						})
					)
				);
			}
			return React.createElement(
				TableHeaderCell,
				_extends({}, props, {
					key: key,
					columnKey: key,
					style: {
						flex: getFlexWidth(width || defaultCellWidth)
					},
					className: classnames(getHeaderCellCls(false, draggable))
				}),
				title
			);
		})
	);
}

var css$1 = "* {\n  box-sizing: border-box;\n}\n.yt-table-container {\n  height: inherit;\n  width: auto;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n.yt-table-container .yt-table-thead {\n  background: #f9f9f9;\n  border: 1px solid #d9d9d9;\n  display: flex;\n  flex-direction: row;\n  text-align: center;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-draggable {\n  cursor: col-resize;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell {\n  flex: 1;\n  min-height: 30px;\n  border-right: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul {\n  flex: 1;\n  border-right: 1px solid #d9d9d9;\n  border-bottom: 0px;\n  display: flex;\n  flex-direction: column;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-top {\n  flex: 1;\n  min-height: 30px;\n  border-bottom: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom {\n  flex: 1;\n  display: flex;\n  min-height: 30px;\n  flex-direction: row;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom .yt-table-thead-cell-mul-bottom-item {\n  width: 100%;\n  border-right: 1px solid #d9d9d9;\n}\n.yt-table-container .yt-table-thead .yt-table-thead-cell-mul .yt-table-thead-cell-mul-bottom .yt-table-thead-cell-mul-bottom-item:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-tbody {\n  flex: 1;\n  border: 1px solid #d9d9d9;\n  border-top: 0px;\n  margin-left: calc(0vw);\n  overflow: auto;\n}\n.yt-table-container .yt-table-tbody .yt-table-row {\n  border-bottom: 1px solid #d9d9d9;\n  display: flex;\n  flex-direction: row;\n}\n.yt-table-container .yt-table-tbody .yt-table-row:hover {\n  background-color: #ecf6fd;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell {\n  overflow: hidden;\n  flex: 1;\n  border-right: 1px solid #d9d9d9;\n  min-height: 30px;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell:last-child {\n  border-right: 0px;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell .yt-table-row-cell-content {\n  height: 100%;\n  width: 100%;\n}\n.yt-table-container .yt-table-tbody .yt-table-row .yt-table-row-cell:focus {\n  outline: -webkit-focus-ring-color auto 2px;\n}\n.yt-table-container .yt-table-tbody .yt-table-selected-row {\n  background: #90caf3;\n}\n.yt-table-container .yt-table-tbody .yt-table-selected-row:hover {\n  background-color: #90caf3;\n}\n.yt-table-nowarp {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.yt-table-warp {\n  word-wrap: break-word;\n}\n.yt-table-cell-span,\n.yt-table-row-cell-content {\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  line-height: 30px;\n}\n.yt-table-cell-input {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  height: 100%;\n  width: 100%;\n}\n.yt-table-cell-select {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  height: 100%;\n  width: 100%;\n  background: inherit;\n}\n.yt-table-last-child-no-border:last-child {\n  border-right: 0px !important;\n}\n.yt-table-up-down-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n*:focus {\n  outline: none;\n  border-color: #40a9ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n";
__$$styleInject(css$1);

var ytTablePerfix = config.ytTablePerfix;

var Table = function (_React$Component) {
	inherits(Table, _React$Component);

	function Table(props) {
		classCallCheck(this, Table);

		var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.setColumns = function (columns) {
			return _this.setState({ columns: columns });
		};

		_this.handleKeyDown = function (e) {
			if (e.keyCode === 9) {
				e.preventDefault();
				var activeDom = document.querySelector('.' + ytTablePerfix + '-active-cell');
				if (!activeDom) {
					var firstCanFoucesDom = document.querySelector('.' + ytTablePerfix + '-can-focus-cell:first-child');
					if (firstCanFoucesDom) {
						triggerTableCellClick(firstCanFoucesDom);
					}
					var tbody = document.querySelector('.' + ytTablePerfix + '-tbody');
					if (tbody.scrollTop !== 0) {
						tbody.scrollTop = 0;
					}
				} else {
					getNextFocus(activeDom, '.' + ytTablePerfix + '-can-focus-cell');
				}
			}
		};

		_this.state = {
			columns: props.columns || []
		};
		return _this;
	}

	Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		// const compareArr = ['columns', 'dataSource']
		if (this.props.columns !== nextProps.columns) {
			this.setState({
				columns: nextProps.columns
			});
		}
	};

	Table.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
		var _this2 = this;

		var compareArr = ['columns'];
		if (compareArr.some(function (key) {
			return _this2.props[key] !== nextProps[key];
		})) {
			return false;
		}
		return true;
	};

	Table.prototype.componentWillUnmount = function componentWillUnmount() {};

	Table.prototype.render = function render() {
		return React.createElement(
			'div',
			{ onKeyDown: this.handleKeyDown, className: 'yt-table-container' },
			React.createElement(TableHeader, _extends({}, this.props, {
				columns: this.state.columns,
				setColumns: this.setColumns
			})),
			React.createElement(TableBody, _extends({}, this.props, {
				columns: this.state.columns,
				setColumns: this.setColumns
			}))
		);
	};

	return Table;
}(React.Component);

Table.propTypes = {
	getRowKey: PropTypes.func.isRequired,
	columns: PropTypes.array.isRequired,
	dataSource: PropTypes.array.isRequired
};

// import RCSelect, {Option} from 'rc-select'
Table.Select = Select;

return Table;

})));