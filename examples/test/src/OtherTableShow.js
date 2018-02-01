import React from 'react'
const ReactDataGrid = require('react-data-grid/dist/react-data-grid.min.js')

export default class OtherTableShow extends React.Component {
	render() {
		return <Example />
	}
}

class Example extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.createRows()
		this._columns = [
			{ key: 'id', name: 'ID' },
			{ key: 'title', name: 'Title' },
			{ key: 'count', name: 'Count' },
		]

		this.state = null
	}

	createRows = () => {
		let rows = []
		for (let i = 1; i < 1000; i++) {
			rows.push({
				id: i,
				title: 'Title ' + i,
				count: i * 1000,
			})
		}

		this._rows = rows
	}

	rowGetter = i => {
		return this._rows[i]
	}

	render() {
		return (
            <div style={{width: 412}}>
                <ReactDataGrid
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this._rows.length}
                    minHeight={500}
                />
            </div>
		)
	}
}
