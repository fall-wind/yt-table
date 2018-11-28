/* eslint-disable */
import * as React from 'react';
import { getKey } from '../../utils';
import RowCell, { SelectCell } from './TbodyCell';
import { BodyRowWarpProps, BodyRowProps } from '../../interface';

class BodyRowWarp<T, K> extends React.PureComponent<
	BodyRowWarpProps<T, K>,
	any
> {
	render() {
		const { rowKey, itemData, childrenName = '', indexLevel } = this.props;
		let showArr = [
			<BodyRow key={getKey(itemData, rowKey)} {...this.props} />,
		];
		const childrenData = (itemData as any)[childrenName];
		if (childrenData && Array.isArray(childrenData)) {
			showArr = showArr.concat(
				childrenData.map(item => {
					return (
						<BodyRowWarp
							{...this.props}
							itemData={item}
							key={getKey(item, rowKey)}
							pId={getKey(itemData, rowKey)}
							indexLevel={indexLevel + 1}
						/>
					);
				})
			);
		}
		return showArr;
	}
}

function BodyRow<T, K>(props: BodyRowProps<T, K>) {
    const { rowSelection, ...restProps } = props
	const {
		columns,
		mulCellKey,
		resized,
		expandedKeys,
		pId,
        itemData,
	} = restProps;
	let rowStyle = {};
	if (Number(pId) !== 0 && expandedKeys.indexOf(pId as any) === -1) {
		rowStyle = {
			display: 'none',
		};
	}
	return (
		<div className="yc-tbody-row" style={rowStyle}>
			{rowSelection && <SelectCell {...props} />}
			{columns.map((column, index) => {
                const curResizedObj = resized.find(
                    it => it.key === column.key
                )
                if (!curResizedObj) {
                    return null
                }
				return (
					<RowCell
						{...restProps}
						mulCellKey={mulCellKey}
						itemData={itemData}
						key={column.key}
						cellIndex={index}
						column={column}
						curResizedObj={curResizedObj}
					/>
				);
			})}
		</div>
	);
}

export default BodyRowWarp;
