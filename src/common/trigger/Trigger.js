import React from 'react'
import Portal from '../util/Portal'

// 当点击在body上的元素 select失去焦点
class Trigger extends React.Component {
	getContainer() {
        console.error(this, '???')
		const popupContainer = document.createElement('div')
		popupContainer.style.position = 'absolute'
		popupContainer.style.top = '0'
		popupContainer.style.left = '0'
		popupContainer.style.width = '100%'
		const mountNode = window.document.body
		mountNode.appendChild(popupContainer)
		return popupContainer
	}

	render() {
		const { children } = this.props
		return (
			<Portal key="protal" getContainer={this.getContainer}>
				{children}
			</Portal>
		)
	}
}

export default Trigger
