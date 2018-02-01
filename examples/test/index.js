import React from 'react'
import ReactDOM from 'react-dom'
import OtherTableShow from './src/OtherTableShow'
import Table from '../../lib/ytTable'
import 'normalize.css'

const data = [
	{ name: 'yt1111111111111111111111111111', age: '25', id: 1, sex: '男', height: '174' },
	{ name: 'yt2', age: '25', id: 2, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 3, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 4, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 5, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 6, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 7, sex: '男', height: '175' },
]

const columns = [
	{
		title: '姓名',
		key: 'name',
		type: 'input',
	},
	{
		title: '年龄',
		key: 'age',
		fatherTitle: {
			title: '基本信息',
		},
	},
	{
		title: '性别',
		key: 'sex',
		type: 'select',
		fatherTitle: {
			title: '基本信息',
		},
	},
	{
		title: '身高',
        key: 'height',
        type: 'input',
		fatherTitle: {
			title: '基本信息',
		},
	},
	// { title: '性别', key: 'sex', render(text, record) {
	//     return (
	//         <select onChange={e => {
	//             console.log(e.target.value)
	//         }}>
	//             <option value="ss">sss</option>
	//             <option value="sss">sss</option>
	//             <option value="ssss">ssss</option>
	//             <option value="sssss">sssss</option>
	//         </select>
	//     )
	// } },
]

const columns1 = [
	{
		title: <span style={{ color: 'red' }}>姓名</span>,
		key: 'name',
		type: 'input',
	},
	{
		title: '年龄',
		key: 'age',
		fatherTitle: {
			title: '基本信息',
		},
	},
	{
		title: '性别',
		key: 'sex',
		fatherTitle: {
			title: '基本信息',
		},
	},
]

class TableTest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			columns,
			dataSource: data,
		}
	}

	handleCellChange = (rowKey, cellKey, val) => {
		const { dataSource } = this.state
		this.setState({
			dataSource: dataSource.map(record => {
				if (record.id === rowKey) {
					return {
						...record,
						[cellKey]: val,
					}
				}
				return record
			}),
		})
	}

	render() {
		const { name } = this.props
		return (
			<div>
				<div>common table</div>
				<div
					style={{
						width: 300,
						height: 200,
					}}
				>
					<Table
						getRowKey={record => record.id}
						dataSource={this.state.dataSource}
						columns={this.state.columns}
						onCellChange={this.handleCellChange}
						handleRowClick={rowKey => {
							console.log(rowKey, '????')
						}}
					/>
				</div>
			</div>
		)
	}
}

function App(props) {
	return (
		<div style={{ marginLeft: 10 }}>
			<TableTest />
            {/* <div>other table: react-data-grid </div>
            <OtherTableShow /> */}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
