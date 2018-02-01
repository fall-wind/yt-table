import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableHeader } from './components'
import './Table.less'

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<div className="yt-table-container">
				<TableHeader {...this.props} />
				<TableBody {...this.props} />
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
