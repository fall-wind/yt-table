import React from 'react'
import TableRow from './TableRow'
import config from './config'
const { ytTablePerfix } = config

export default class TableBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentRowKey: -1,
        }
    }

    changeCurrentRowKey = (val, callback) => {
        this.setState({
            currentRowKey: val,
        }, () => {
            callback && callback()
        })
    }

	render() {
        const { dataSource, getRowKey, columns } = this.props
        const { currentRowKey } = this.state
		return (
			<div className={`${ytTablePerfix}-tbody`}>
				{dataSource.map(record => (
					<TableRow
                        {...this.props}
                        currentRowKey={currentRowKey}
						key={getRowKey(record)}
						rowKey={getRowKey(record)}
                        record={record}
                        changeCurrentRowKey={this.changeCurrentRowKey}
					/>
				))}
			</div>
		)
	}
}
