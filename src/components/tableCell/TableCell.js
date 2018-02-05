import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputCell from './InputCell'
import SelectCell from './SelectCell'
import config from '../config'
const { ytTablePerfix, canFocusType } = config

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

	chechIsCanFocusCell = props => {
		const { column, record, rowIndex, cellIndex } = props
		const { width, warp, render, key, canFocus = false } = column
		return canFocusType.includes(column.type) || canFocus
	}

	setClickedValue = val => {
		this.setState({ clicked: val })
	}

	handleCellClick = () => {
		if (!this.chechIsCanFocusCell(this.props)) {
			return
		}
		if (this.state.clicked) {
			return
		}
		this.setClickedValue(true)
	}

	// do not need set false because it child will do it
	handleBlur = () => {
		// if (this.chechIsCanFocusCell(this.props)) {
		//     setTimeout(() => {
		//         this.setClickedValue(false)
		//     })
		//     // this.setClickedValue(false)
		// }
	}

	render() {
		const props = this.props
		const { column, record, rowIndex, cellIndex } = props
		const { width, warp, render, key, canFocus } = column
		const { clicked } = this.state
		const checkChildCanFocus =
			canFocusType.includes(column.type) || canFocus
		const rowCellCls = {
			[`${ytTablePerfix}-row-cell`]: true,
			[`${ytTablePerfix}-can-focus-cell`]: checkChildCanFocus,
			[`${ytTablePerfix}-active-cell`]: clicked,
		}

		return (
			<div
				onClick={this.handleCellClick}
				{...(checkChildCanFocus ? { tabIndex: '-1' } : {})}
				onBlur={this.handleBlur}
				className={classnames(rowCellCls)}
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
						? render(record[key], record)
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
