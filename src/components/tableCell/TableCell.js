import React from 'react'
import InputCell from './InputCell'
import SelectCell from './SelectCell'
import config from '../config'
const { ytTablePerfix } = config

function renderCell(record, column, props) {
	const { type, key } = column
	let result = record[key]
	switch (type) {
		case 'input': {
			result = <InputCell {...props} value={result} />
			break
		}
		case 'select': {
			result = <SelectCell {...props} value={result} />
		}
	}
	return result
}

export const TableCell = props => {
	const { column, record } = props
	const { width, warp, render, key } = column
	return (
		<div
			className={`${ytTablePerfix}-row-cell`}
			key={key}
			style={{
				// width: width || 100,
			}}
		>
			<div
				className={`${ytTablePerfix}-row-cell-content ${
					warp ? `${ytTablePerfix}-warp` : `${ytTablePerfix}-nowarp`
				}`}
			>
				{render
					? render(record[key], record)
					: renderCell(record, column, props)}
			</div>
		</div>
	)
}

export default TableCell
