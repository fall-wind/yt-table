import React from 'react'
import TableCell from './tableCell/TableCell'
import config from './config'
import { accArrWidth } from '../utils'
// import { accArrWidth, pxAdd } from '../utils'

const { ytTablePerfix } = config

class TableRow extends React.PureComponent {
	handleRowClick = () => {
		const { changeCurrentRowKey, rowKey, handleRowClick } = this.props
		changeCurrentRowKey(rowKey)
		handleRowClick && handleRowClick(rowKey)
	}

	handleDoubleRowClick = () => {
		const { changeCurrentRowKey, rowKey, handleDoubleRowClick } = this.props
		changeCurrentRowKey(rowKey)
		handleDoubleRowClick && handleDoubleRowClick(rowKey)
	}

	render() {
		const { columns, rowKey, currentRowKey } = this.props
		const isSelectedRow = rowKey === currentRowKey
		return (
			<div
				style={{
					// width: pxAdd(
					// 	accArrWidth(columns, item => item.width),
					// 	2
					// ),
					width: accArrWidth(columns, item => item.width),
				}}
				onClick={this.handleRowClick}
				onDoubleClick={this.handleDoubleRowClick}
				className={`${ytTablePerfix}-row ${
					isSelectedRow ? `${ytTablePerfix}-selected-row` : ''
				}`}
			>
				{columns.map((column, index) => {
					return (
						<TableCell
							{...this.props}
							cellKey={column.key}
							key={column.key}
							cellIndex={index}
							column={column}
						/>
					)
				})}
			</div>
		)
	}
}

export default TableRow
