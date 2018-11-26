import React from 'react'
let count = 0

class MyComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			count,
		}
	}
	componentWillMount() {
        // debugger
		// this.setState({
		// 	count: ++count,
		// })
		// this.setState({
		// 	count: ++count,
		// })
		// setTimeout(() => {
		// 	this.setState({
		// 		count: ++count,
		// 	})
		// 	this.setState({
		// 		count: ++count,
		// 	})
		// }, 1000)
	}
	componentDidMount() {
        // debugger
		// this.button.addEventListener(
		// 	'click',
		// 	this.onClick.bind(this, '原生浏览器事件'),
		// 	false,
		// )
	}
	onClick(info) {
		// console.log(info)
		this.setState({
			count: ++count,
		}, () => {
            debugger
        })

		// this.setState({
		// 	count: ++count,
        // })
        // debugger
	}
	render() {
		console.log(this.state.count)
		return (
			<div>
				<button
					type="button"
					ref={node => (this.button = node)}
					onClick={this.onClick.bind(this, 'React事件')}
				>
					生成新计数
				</button>
				<div>Count : {this.state.count}</div>
			</div>
		)
	}
}

export default MyComponent
