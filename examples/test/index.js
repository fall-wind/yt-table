import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../../lib/ytTable';

const data = [
	{ name: 'yt1', age: '25', id: 1, sex: '男', height: '174' },
	{ name: 'yt2', age: '25', id: 2, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 3, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 4, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 5, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 6, sex: '男', height: '174' },
	{ name: 'yt3', age: '25', id: 7, sex: '男', height: '175' },
];

const columns = [
	{
		title: '姓名',
		key: 'name',
		dataIndex: 'name',
	},
	{
		children: [
			{
				title: '年龄',
				key: 'age',
				dataIndex: 'age',
			},
			{
				title: '性别',
				key: 'sex',
				dataIndex: 'sex',
			},
			{
				title: '身高',
				key: 'height',
				dataIndex: 'height',
			},
		],
	},
];

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
];

class TableTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns,
			dataSource: data,
		};
	}

	handleCellChange = (rowKey, cellKey, val) => {
		const { dataSource } = this.state;
		this.setState({
			dataSource: dataSource.map(record => {
				if (record.id === rowKey) {
					return {
						...record,
						[cellKey]: val,
					};
				}
				return record;
			}),
		});
    };
    
    rowKey = record => {
        return record.id
    }

	render() {
		// const { name } = this.props;
		return (
			<div>
				<div>common table</div>
				<div style={{ display: 'flex', flex: 1 }}>
					<Table
                        rowKey={this.rowKey}
						dataSource={this.state.dataSource}
						columns={this.state.columns}
					/>
				</div>
			</div>
		);
	}
}

function App(props) {
	return (
		<div style={{ marginLeft: 10 }}>
			<TableTest />
			{/* <Select style={{ width: 180 }}>
				{[1, 2, 3, 4].map(it => (
					<Option key={it} value={it}>
						{it}
					</Option>
				))}
			</Select> */}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
