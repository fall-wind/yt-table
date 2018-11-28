import * as React from 'react';
import { Icon } from 'antd'
// import { AutoSizer, List } from 'react-virtualized';
import { getRowMinWidth, getKey } from '../../utils';
import BodyRowWarp from './TbodyRow';
import { TbodyProps, TbodyState } from '../../interface'

export const NoDataDiv = () => {
	return (
		<div
			style={{
				padding: '16px 8px',
				background: '#fff',
				textAlign: 'center',
				fontSize: '12px',
				color: 'rgba(0, 0, 0, 0.43)',
			}}
		>
			<Icon type="frown-o" /> 暂无数据
		</div>
	);
};

/**
 * childrenName 即认为是树形的表格结构
 */
class Tbody<T, K> extends React.Component<TbodyProps<T>, TbodyState<K>> {
    constructor(props: TbodyProps<T>) {
        super(props)
        this.state = {
            expandedKeys: [],
        };
    }
    
    listRef: any

	componentWillReceiveProps(nextProps: TbodyProps<T>) {
		let forceUpdateFlag = false;
		if (nextProps.dataSource !== this.props.dataSource) {
			forceUpdateFlag = true;
		} else if (this.props.rowSelection !== nextProps.rowSelection) {
			forceUpdateFlag = true;
		}
		if (forceUpdateFlag) {
			this.listRef && this.listRef.forceUpdateGrid();
		}
	}

	handleExpend = (id: K, itemData: T) => {
		const { expandedKeys } = this.state;
		let newKeys = [];

		if (expandedKeys.indexOf(id) > -1) {
			const keys = this.gCKeys(id, itemData);
			newKeys = expandedKeys.filter(item => !keys.some(it => it == item));
		} else {
			newKeys = [...expandedKeys, id];
		}
		this.setState({
			expandedKeys: newKeys,
		});
	};

	gCKeys = (itemKey: K, itemData: T) => {
		const { rowKey, childrenName = '' } = this.props;
		const arr: K[] = [];
		const loop = (key: K, children: T[]) => {
			arr.push(key);
			children.forEach(item => {
				if ((item as any)[childrenName]) {
					loop(getKey(item, rowKey), (item as any)[childrenName]);
				}
			});
		};
		loop(itemKey, (itemData as any)[childrenName]);
		return arr;
	};

	// rowRenderer = ({ index, key, style }) => {
	// 	const {
	// 		dataSource,
	// 		rowKey,
	// 		columns,
	// 		childrenName,
	// 		mulCellKey,
	// 	} = this.props;
	// 	const { expandedKeys } = this.state;
	// 	const itemData = dataSource[index];
	// 	return (
	// 		<div key={key} style={style}>
	// 			<BodyRowWarp
	// 				{...this.props}
	// 				indexLevel={1}
	// 				mulCellKey={mulCellKey}
	// 				childrenName={childrenName}
	// 				key={getKey(itemData, data => rowKey(data, 'itemData'))}
	// 				columns={columns}
	// 				itemData={itemData}
	// 				rowIndex={index}
	// 				expandedKeys={expandedKeys}
	// 				handleExpend={this.handleExpend}
	// 				pId={0}
	// 			/>
	// 		</div>
	// 	);
	// };

	// renderVirtualView = () => {
	// 	const { dataSource } = this.props;
	// 	const self = this;
	// 	return (
	// 		<AutoSizer>
	// 			{({ width, height }) => (
	// 				<List
	// 					ref={ref => {
	// 						self.listRef = ref;
	// 					}}
	// 					width={width}
	// 					height={height}
	// 					// overscanRowCount={10}
	// 					overscanRowCount={5}
	// 					rowHeight={35}
	// 					rowCount={dataSource.length}
	// 					// rowCount={20}
	// 					rowRenderer={this.rowRenderer}
	// 				/>
	// 			)}
	// 		</AutoSizer>
	// 	);
	// };

	renderCommonView = () => {
		const {
			dataSource,
			rowKey,
			columns,
			childrenName,
            mulCellKey,
            resized,
		} = this.props;
		const { expandedKeys } = this.state;
		return dataSource.map((itemData, index) => (
			<BodyRowWarp
                // {...this.props}
                rowSelection={this.props.rowSelection}
                rowKey={rowKey}
                resized={resized}
				indexLevel={1}
				mulCellKey={mulCellKey}
				childrenName={childrenName}
				key={getKey(itemData, rowKey)}
				columns={columns}
				itemData={itemData}
				rowIndex={index}
				expandedKeys={expandedKeys}
                handleExpend={this.handleExpend}
                // curResizedObj={curResizedObj}
				pId={0}
			/>
		));
	};

	renderBody = () => {
		// const { virtualized } = this.props;
		// if (virtualized) {
		// 	return this.renderVirtualView();
		// }
		return this.renderCommonView();
	};

	render() {
		const {
			dataSource,
			// rowKey,
			// columns,
			// childrenName,
			// mulCellKey,
			resized,
			rowSelection,
		} = this.props;
		// const { expandedKeys } = this.state;
		if (dataSource.length) {
			return (
				<div
					className="yc-tbody no-scroll-bar-div"
					style={{
						minWidth: getRowMinWidth({ resized, rowSelection }),
					}}
				>
					{this.renderBody()}
				</div>
			);
		}
		return <NoDataDiv />;
	}
}

export default Tbody;
