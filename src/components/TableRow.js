import React from 'react'
import TableCell from './tableCell/TableCell'
import config from './config'
import { accArrWidth, pxAdd } from '../utils'
const { ytTablePerfix } = config

class TableRow extends React.PureComponent {

	handleRowClick = e => {
        const { changeCurrentRowKey, rowKey, handleRowClick } = this.props
        changeCurrentRowKey(rowKey)
        handleRowClick && handleRowClick(rowKey)
    }

	handleDoubleRowClick = e => {
        const { changeCurrentRowKey, rowKey, handleDoubleRowClick } = this.props
        changeCurrentRowKey(rowKey)
        handleDoubleRowClick && handleDoubleRowClick(rowKey)
    }

	render() {
        const { record, columns, rowKey, currentRowKey } = this.props
        const isSelectedRow = rowKey === currentRowKey
		return (
			<div
                style={{
                    width: pxAdd(accArrWidth(columns, record => record.width), 2),
                    width: accArrWidth(columns, record => record.width),
                }}
                onClick={this.handleRowClick}
				onDoubleClick={this.handleDoubleRowClick}
				className={`${ytTablePerfix}-row ${isSelectedRow?`${ytTablePerfix}-selected-row`:''}`}
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
