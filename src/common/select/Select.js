import React from 'react'
import classnames from 'classnames'
import { getOffset } from '../util/dom/css'
import Trigger from '../trigger'
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
			dropDownShow: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		const { children = [] } = nextProps
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
			getOffset
		}
		this.focused = true
	}

	handleBlur = e => {
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
		const { dataLen, activeIndex, focused, dropDownShow } = this.state
		// up 38 down 40
		if (dataLen === 0) return
		if (!dropDownShow) {
			this.setState({
				dropDownShow: true,
            })
            e.preventDefault()
			e.stopPropagation()
			return
		}
		if (e.keyCode == 38 || e.keyCode == 40) {
			this.setState({
				activeIndex: (activeIndex + (e.keyCode - 39)) % dataLen,
            })
            e.preventDefault()
			e.stopPropagation()
		}
		if (e.keyCode === 13) {
			const option = this.props.children[activeIndex]
			const value = option.props.value
			this.onSelect(value, option)
		}
	}

	onSelect = (val, option) => {
		console.error('?????????')
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

	// 暂时不用
	renderChild() {
		const { children, style = {} } = this.props
		const { focused, activeIndex, dropDownShow } = this.state
		const dropDownCls = {
			[`${prefix}-drop-down`]: true,
			[`${prefix}-display-none`]: !dropDownShow,
		}
		const getOptionItemCls = index => {
			return {
				[`${prefix}-drop-down-item`]: true,
				[`${prefix}-drop-down-active-item`]: index === activeIndex,
			}
		}
		const self = this
		return (
			<Trigger>
				<ul style={{}} className={classnames(dropDownCls)} role="menu">
					{React.Children.map(children, function(child, index) {
						const { props } = child
						const { value } = props
						return (
							<li
								role="menuitem"
								className={classnames(getOptionItemCls(index))}
								onClick={() => {
									console.error('option click')
									self.onSelect(value, child)
								}}
							>
								{child}
							</li>
						)
					})}
				</ul>
			</Trigger>
		)
	}

	render() {
		const { children, style = {} } = this.props
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
			[`${prefix}-display-none`]: !dropDownShow,
		}
		const self = this
		return (
			<div
				onKeyDown={this.handleKeyDown}
				onClick={this.handleClick}
				tabIndex="-1"
				ref={ref => (this.selectRef = ref)}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				className={classnames(containerCls)}
				style={style}
			>
				{value}
				{/* <Trigger> */}
				<ul style={{}} className={classnames(dropDownCls)} role="menu">
					{React.Children.map(children, function(child, index) {
						const { props } = child
						const { value } = props
						return (
							<li
								role="menuitem"
								className={classnames(getOptionItemCls(index))}
								onClick={() => {
									console.error('option click')
									self.onSelect(value, child)
								}}
							>
								{child}
							</li>
						)
					})}
				</ul>
				{/* </Trigger> */}
			</div>
		)
	}
}

export default Select
