import React from 'react'

const initState = {
	color: 'red',
}

const TestContext = React.createContext({
	...initState,
})

function SubTest(context) {
	// console.error(context, '???', handleChangeColor)
	return (
		<div>
			<div style={{ color: context.color }}>
				{`my color is ${context.color}`}
			</div>
			{['blue', 'black', 'red'].map(color => {
				return (
					<button
						key={color}
						onClick={() => {
							context.handleChangeColor(color)
						}}
					>
						{`change color to ${color}`}
					</button>
				)
            })}
            <TestContext.Consumer>{context => (<div>{context.color}</div>)}</TestContext.Consumer>
		</div>
	)
}

class TestContextProvider extends React.Component {
	state = {
		// color: 'red',
		...initState,
	}

	handleChangeColor = color => {
		this.setState({
			color,
		})
	}

	render() {
		const { color } = this.state
		return (
			<TestContext.Provider
				value={{ color, handleChangeColor: this.handleChangeColor }}
			>
				{this.props.children}
			</TestContext.Provider>
		)
	}
}

class Test extends React.Component {
	render() {
		return (
			<TestContextProvider>
				<TestContext.Consumer>
					{context => <SubTest {...context} />}
				</TestContext.Consumer>
			</TestContextProvider>
		)
	}
}

export default Test
