import React from 'react';
import contains from '../common/util/dom/contains';

class TableHeaderCell extends React.Component {
	isMouseDown = false;

	componentDidMount() {
		window.addEventListener('mouseup', this.handleMouseUp);
		window.addEventListener('mousedown', this.handleMouseDown);
		window.addEventListener('mousemove', this.handleMouseMove);
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.handleMouseUp);
		window.removeEventListener('mousedown', this.handleMouseUp);
		window.removeEventListener('mousemove', this.handleMouseMove);
	}

	handleMouseDown = e => {
		const dom = this.cellRef;
		if (dom && contains(dom, e.target)) {
			const posObj = dom.getBoundingClientRect();
			if (posObj.right - 5 <= e.pageX && e.pageX <= posObj.right) {
				this.isMouseDown = true;
			}
		}
	};

	handleMouseUp = () => {
		const { setColumns, columnKey, columns } = this.props;
		const dom = this.cellRef;
		if (dom && this.isMouseDown) {
			const posObj = dom.getBoundingClientRect();
			const { width } = posObj;
			// 设置column
			const useColumns = columns.map(item => {
				if (item.key === columnKey) {
					return {
						...item,
						width,
					};
				}
				return item;
			});
			setColumns(useColumns);
		}
		this.isMouseDown = false;
	};

	handleMouseMove = e => {
		const dom = this.cellRef;
		if (this.isMouseDown && dom) {
			const posObj = dom.getBoundingClientRect();
			// const width = `${e.pageX - posObj.left}px`;
			dom.style.flex = `0 0 ${e.pageX - posObj.left}px`;
		}
	};

	render() {
		const { className, style } = this.props;
		return (
  <div
    style={style}
    ref={ref => (this.cellRef = ref)}
				// draggable
				// onMouseDown={this.handleMouseDown}
				// onMouseUp={this.handleMouseUp}
				// onMouseMove={this.handleMouseMove}
    className={className}
  >
    {this.props.children}
  </div>
		);
	}
}

export default TableHeaderCell;
