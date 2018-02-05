import React from 'react'
import { tableCellChildHoc } from '../../hoc'
import config from '../config'
const { ytTablePerfix } = config

@tableCellChildHoc('input')
class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentType: 'text',
		}
	}

	onChange = e => {
		const { onCellChange, rowKey, cellKey } = this.props
		const nextValue = e.target.value
		onCellChange && onCellChange(rowKey, cellKey, nextValue)
	}

	onSpanClick = () => {
		this.setState(
			{
				currentType: 'input',
			},
			() => {
				this.inputRef && this.inputRef.select()
			},
		)
	}

	onBlur = (e) => {
		this.setState({
			currentType: 'text',
        })
        const { onBlur } = this.props
		onBlur && onBlur(e)
        // const { setClickedValue } = this.props
		// setClickedValue && setClickedValue(false)
	}

	handleFocus = e => {
	}

	render() {
		const { value } = this.props
		const { currentType } = this.state
		let result = (
			<span
				className={`${ytTablePerfix}-cell-span`}
				style={{
					width: '100%',
					height: '100%',
					display: 'inline-block',
				}}
				onClick={this.onSpanClick}
			>
				{value}
			</span>
		)
		if (currentType == 'input') {
			result = (
				<input
					className={`${ytTablePerfix}-cell-input`}
					ref={ref => {
						this.inputRef = ref
					}}
					onFocus={this.handleFocus}
					onChange={this.onChange}
					value={value}
					onBlur={this.onBlur}
					type="text"
				/>
			)
		}
		return result
	}
}

export default Input
