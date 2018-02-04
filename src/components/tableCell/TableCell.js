import React from 'react'
import PropTypes from 'prop-types'
import {tableCellChildHoc} from '../../hoc'
import InputCell from './InputCell'
import SelectCell from './SelectCell'
import config from '../config'
const { ytTablePerfix } = config

function renderCell(record, column, props, setClickedValue) {
	const { type, key } = column
	let result = record[key]
	switch (type) {
		case 'input': {
			result = (
				<InputCell
					{...props}
					setClickedValue={setClickedValue}
					value={result}
				/>
			)
			break
		}
		case 'select': {
			result = (
				<SelectCell
					{...props}
					setClickedValue={setClickedValue}
					value={result}
				/>
            )
            break
		}
	}
	return result
}

const canFocusType = ['select', 'input']

class TableCell extends React.Component {
	state = {
		clicked: false,
    }
    
    getChildContext() {
        return {
            setClickedValue: this.setClickedValue,
        }
    }

    static childContextTypes = {
        setClickedValue: PropTypes.func,
    }

	setClickedValue = val => {
		this.setState({ clicked: val })
	}

	handleCellClick = () => {
		if (this.clicked) {
			return
		}
		this.setClickedValue(true)
	}

	handleBlur = () => {
		// this.setClickedValue(false)
	}

	render() {
		const props = this.props
		const { column, record, rowIndex, cellIndex } = props
		const { width, warp, render, key, canFocus } = column
		const { clicked } = this.state
		return (
			<div
				onClick={this.handleCellClick}
				// tabIndex={Number(`${rowIndex}${cellIndex}`)}
				tabIndex="-1"
				onBlur={this.handleBlur}
				className={`${ytTablePerfix}-row-cell ${
					(canFocusType.includes(column.type) || canFocus)
						? `${ytTablePerfix}-can-focus-cell`
						: ''
				} ${clicked ? `${ytTablePerfix}-active-cell` : ''}`}
				key={key}
			>
				<div
					className={`${ytTablePerfix}-row-cell-content ${
						warp
							? `${ytTablePerfix}-warp`
							: `${ytTablePerfix}-nowarp`
					}`}
				>
					{render
						? (render(record[key], record))
						: renderCell(
								record,
								column,
								props,
								this.setClickedValue,
							)}
				</div>
			</div>
		)
	}
}

export default TableCell
