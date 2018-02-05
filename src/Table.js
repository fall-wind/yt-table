import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableHeader } from './components'
import './Table.less'
import config from './components/config'
const { ytTablePerfix } = config
import { triggerTableCellClick, getNextFocus } from './utils'

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleKeyDown = e => {
		if (e.keyCode == 9) {
			e.preventDefault()
			const activeDom = document.querySelector(
				`.${ytTablePerfix}-active-cell`,
			)
			if (!activeDom) {
				const firstCanFoucesDom = document.querySelector(
					`.${ytTablePerfix}-can-focus-cell:first-child`,
				)
				firstCanFoucesDom && triggerTableCellClick(firstCanFoucesDom)
				const tbody = document.querySelector(`.${ytTablePerfix}-tbody`)
				if (tbody.scrollTop !== 0) {
					tbody.scrollTop = 0
				}
			} else {
                console.error('1111111')
				getNextFocus(activeDom, `.${ytTablePerfix}-can-focus-cell`)
			}
		}
	}

    componentWillUnmount() {}

	render() {
		return (
			<div onKeyDown={this.handleKeyDown} className="yt-table-container">
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
