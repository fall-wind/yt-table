import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableHeader } from './components'
import config from './components/config'
import { triggerTableCellClick, getNextFocus } from './utils'
import './Table.less'

const { ytTablePerfix } = config

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: props.columns || [],
		}
	}

	componentWillReceiveProps(nextProps) {
		// const compareArr = ['columns', 'dataSource']
		if (this.props.columns !== nextProps.columns) {
			this.setState({
				columns: nextProps.columns,
			})
		}
	}

	setColumns = columns => this.setState({ columns })

	shouldComponentUpdate(nextProps) {
		const compareArr = ['columns']
		if (compareArr.some(key => this.props[key] !== nextProps[key])) {
			return false
		}
		return true
	}

	handleKeyDown = e => {
		if (e.keyCode === 9) {
			e.preventDefault()
			const activeDom = document.querySelector(
				`.${ytTablePerfix}-active-cell`
			)
			if (!activeDom) {
				const firstCanFoucesDom = document.querySelector(
					`.${ytTablePerfix}-can-focus-cell:first-child`
				)
				if (firstCanFoucesDom) {
					triggerTableCellClick(firstCanFoucesDom)
				}
				const tbody = document.querySelector(`.${ytTablePerfix}-tbody`)
				if (tbody.scrollTop !== 0) {
					tbody.scrollTop = 0
				}
			} else {
				getNextFocus(activeDom, `.${ytTablePerfix}-can-focus-cell`)
			}
		}
	}

	componentWillUnmount() {}

	render() {
		return (
			<div onKeyDown={this.handleKeyDown} className="yt-table-container">
				<TableHeader
					{...this.props}
					columns={this.state.columns}
					setColumns={this.setColumns}
				/>
				<TableBody
					{...this.props}
					columns={this.state.columns}
					setColumns={this.setColumns}
				/>
			</div>
		)
	}
}

Table.propTypes = {
	getRowKey: PropTypes.func.isRequired,
	columns: PropTypes.array.isRequired,
	dataSource: PropTypes.array.isRequired,
}

export default Table
