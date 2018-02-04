import React from 'react'
import './select.less'

const prefix = 'yt-select'

class Select extends React.Component {
	state = {}

	handleFocus = () => {
		if (this._focused) {
			return
		}
		this._focused = true
	}

	handleBlur = () => {
		this._focused = false
	}

	handleKeyDown = e => {
	}

	render() {
		const { children } = this.props
		return (
			<div
				onKeyDown={this.handleKeyDown}
				tabIndex="-1"
				ref={ref => (this.selectRef = ref)}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				className={`${prefix} ${
					this._focused ? `${prefix}-focused` : ''
				}`}
			>
                <ul className={`${prefix}-drop-down ${this._focused ? '' : `${prefix}-display-none`}`}>
                    {React.Children.map(children, function(child, index) {
                        return <div className={`${prefix}-drop-down-item`}>
                        {child}
                        </div>
                    })}
                </ul>
			</div>
		)
	}
}

export default Select
