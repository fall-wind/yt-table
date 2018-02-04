import React from 'react'
import './select.less'

const prefix = 'yt-select'

class Select extends React.Component {
	state = {
		focused: false,
	}

	setFocused = val => this.setState({ focused: val })

	handleFocus = () => {
		if (this.state.focused) {
			return
        }
        this.setFocused(true)
	}

	handleBlur = () => {
		this.setFocused(false)
	}

	handleKeyDown = e => {}

	render() {
        const { children } = this.props
        const { focused } = this.state
		return (
			<div
				onKeyDown={this.handleKeyDown}
				tabIndex="-1"
				ref={ref => (this.selectRef = ref)}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				className={`${prefix} ${
					focused ? `${prefix}-focused` : ''
				}`}
			>
				<ul
					className={`${prefix}-drop-down ${
						focused ? '' : `${prefix}-display-none`
					}`}
				>
					{React.Children.map(children, function(child, index) {
						return (
							<div className={`${prefix}-drop-down-item`}>
								{child}
							</div>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Select
