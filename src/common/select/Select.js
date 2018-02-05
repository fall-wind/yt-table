import React from 'react'
import classnames from 'classnames'
import './select.less'

const prefix = 'yt-select'

class Select extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			focused: false,
			activeIndex: 1,
			dataLen: (props.children || []).length,
            value: props.value || '',
            dropDownShow: false
		}
	}

	componentWillReceiveProps(nextProps) {
		const { children = [] } = nextProps
		console.error(children.length)
		if (children.length !== (this.props.children || []).length) {
			this.setState({ dataLen: children.length })
		}
		if ('value' in this.props) {
			this.setState({
				value: this.props.value,
			})
		}
	}

	setFocused = val => this.setState({ focused: val })

	handleFocus = () => {
		// if (this.state.focused) {
		// 	return
		// }
        // this.setFocused(true)
        this.setState({
            dropDownShow: true,
            focused: true,
        })
    }

    focused = false
    
    handleClick = () => {
        if (this.focused) {
            this.setState({
                dropDownShow: !this.state.dropDownShow,
            })
        }
        this.focused = true
    }

	handleBlur = (e) => {
        // this.setFocused(false)
        const { onBlur } = this.props
        this.focused = false
        this.setState({
            focused: false,
            dropDownShow: false,
        })
        onBlur && onBlur(e)
	}

	handleKeyDown = e => {
		console.error('keyCode: ', e.keyCode)
		const { dataLen, activeIndex, focused, dropDownShow } = this.state
		// up 38 down 40
        if (dataLen === 0 ) return
        if (!dropDownShow) {
            this.setState({
                dropDownShow: true,
            })
            return
        }
		if (e.keyCode == 38 || e.keyCode == 40) {
			this.setState({
				activeIndex: (activeIndex + (e.keyCode - 39)) % dataLen,
            })
            e.stopPropagation()
        }
        if (e.keyCode === 13) {
            const option = this.props.children[activeIndex]
            const value = option.props.value
            this.onSelect(value, option)
        }
	}

	onSelect = (val, option) => {
        const { onSelect } = this.props
        this.setState({
            dropDownShow: false,
        })
        onSelect && onSelect(val, option)
        if ('value' in this.props) {

        } else {
            this.setState({
                value: val,
            })
        }
	}

	render() {
		const { children } = this.props
		const { focused, activeIndex, dropDownShow } = this.state
		let value = 'value' in this.props ? this.props.value : this.state.value
		const getOptionItemCls = index => {
			return {
				[`${prefix}-drop-down-item`]: true,
				[`${prefix}-drop-down-active-item`]: index === activeIndex,
			}
        }
        const containerCls = {
            [prefix]: true,
            [`${prefix}-focused`]: focused,
        }
        const dropDownCls = {
            [`${prefix}-drop-down`]: true,
            [`${prefix}-display-none`]: !dropDownShow
        }
        const self = this
        console.error(self, value, '???')
		return (
			<div
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}
				tabIndex="-1"
				ref={ref => (this.selectRef = ref)}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				className={classnames(containerCls)}
			>
				{value}
				<ul
					className={classnames(dropDownCls)}
					role="menu"
				>
					{React.Children.map(children, function(child, index) {
						const { props } = child
						const { value } = props
						return (
							<li
								role="menuitem"
								className={classnames(getOptionItemCls(index))}
								onClick={() => {
									self.onSelect(value, child)
								}}
							>
								{child}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Select
