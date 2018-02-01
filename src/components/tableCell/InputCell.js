import React from 'react'
import config from '../config'
const { ytTablePerfix } = config

// currentType: ['input', 'text']

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentType: 'text',
		}
	}

	onChange = (e) => {
		const { onCellChange, rowKey, cellKey } = this.props
		const nextValue = e.target.value
		onCellChange && onCellChange(rowKey, cellKey, nextValue)
	}

	onSpanClick = () => {
		this.setState({
			currentType: 'input',
        }, () => {
            this.inputRef && this.inputRef.select()
        })
	}

	onBlur = () => {
        this.setState({
            currentType: 'text',
        })
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
                    display: 'inline-block'
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
