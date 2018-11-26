/* eslint-disable */
import React from 'react';
import { getKey } from '../../utils'
import RowCell, { SelectCell } from './TbodyCell';

class BodyRowWarp extends React.PureComponent {
    render() {
        const { rowKey, itemData, childrenName, indexLevel} = this.props;
        let showArr = [<BodyRow key={getKey(itemData, rowKey)} {...this.props} />];
        const childrenData = itemData[childrenName];
        if (Array.isArray(childrenData)) {
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

function BodyRow(props) {
    const {
        columns,
        itemData,
        mulCellKey,
        resized,
        expandedKeys,
        pId,
        rowSelection,
        noExpend,
        style = {},
    } = props;
    const rowStyle = { ...style };
    if (!noExpend && pId !== 0 && expandedKeys.indexOf(pId) === -1) {
        rowStyle.display = 'none';
    }
    return (
        <div className="yc-tbody-row" style={rowStyle}>
            {rowSelection && <SelectCell {...props} />}
            {columns.map((column, index) => (
                <RowCell
                    {...props}
                    itemData={itemData}
                    mulCellKey={mulCellKey}
                    {...column}
                    key={column.key}
                    cellIndex={index}
                    column={column}
                    curResizedObj={resized.find(it => it.key === column.key)}
                />
            ))}
        </div>
    );
}

export default BodyRowWarp;
