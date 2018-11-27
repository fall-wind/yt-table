(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ytTable = factory(global.React));
}(this, (function (React) { 'use strict';

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

var Table = function (_React$Component) {
    inherits(Table, _React$Component);

    function Table() {
        classCallCheck(this, Table);
        return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Table.prototype.render = function render() {
        var columns = this.props.columns;

        return React.createElement(
            "div",
            { className: "yt-table" },
            JSON.stringify(columns[0])
        );
    };

    return Table;
}(React.Component);

return Table;

})));
