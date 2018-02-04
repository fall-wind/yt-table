import React from 'react'

class Option extends React.Component {
	render() {
		const { children } = this.props
		return <div>{children}</div>
	}
}

export default Option
