import React from 'react'
import classnames from 'classnames'
import contains from '../util/dom/contains'
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
			styleObj: {},
		}
	}

    // .......
	onDocumentClick = e => {
		if (this.state.focused && this.state.dropDownShow) {
			return
        }
		if (!contains(this.dropDownRef) && !contains(this.selectRef)) {
			this.handleBlur(e)
		}
	}

	componentDidMount() {
		// document.addEventListener('click', this.onDocumentClick)
	}

	componentWillUnmount() {
		// document.removeEventListener('click', this.onDocumentClick)
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
			this.focused = true
		} else {
			const styleObj = getOffset(this.selectRef)
			if (this.dropDownRef) {
				console.info(this.dropDownRef.style, 'sss')
				this.dropDownRef.style.top =
					styleObj.top + styleObj.height + 'px'
				this.dropDownRef.style.left = styleObj.left + 'px'
				this.dropDownRef.style.width = styleObj.width + 'px'
			}
		}
		this.focused = true
	}

	handleBlur = e => {
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
		console.error('???', e.keyCode)
		const listenKeyArr = [38, 40, 13]
		if (dataLen === 0) return
		if (e.keyCode == 38 || e.keyCode == 40) {
			if (!dropDownShow) {
				this.setState({
					dropDownShow: true,
				})
				e.preventDefault()
				e.stopPropagation()
				return
			}
			this.setState({
				activeIndex: (activeIndex + (e.keyCode - 39)) % dataLen,
			})
			e.preventDefault()
			e.stopPropagation()
		} else if (e.keyCode == 13) {
			const option = this.props.children[activeIndex]
			const value = option.props.value
			this.onSelect(value, option)
		} else if (e.keyCode == 9) {
			this.handleBlur(e)
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
		const { children, style = {} } = this.props
		const { focused, activeIndex, dropDownShow, styleObj } = this.state
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
				// onBlur={this.handleBlur}
				className={classnames(containerCls)}
				style={style}
			>
				{value}
				<Trigger>
					<ul
						ref={ref => (this.dropDownRef = ref)}
						style={{
							position: 'absolute',
						}}
						className={classnames(dropDownCls)}
						role="menu"
					>
						{React.Children.map(children, function(child, index) {
							const { props } = child
							const { value } = props
							return (
								<li
									role="menuitem"
									className={classnames(
										getOptionItemCls(index),
									)}
									onClick={() => {
										self.onSelect(value, child)
									}}
								>
									{child}
								</li>
							)
						})}
					</ul>
				</Trigger>
			</div>
		)
	}
}

export default Select
