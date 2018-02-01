import React from 'react'
import config from '../config'
const { ytTablePerfix } = config

class SelectCell extends React.Component {

    onChange = (e) => {
        const { onCellChange, rowKey, cellKey } = this.props
        console.log(e.target.value)
        onCellChange && onCellChange(rowKey, cellKey, e.target.value)
    }

    render() {
        const {value} = this.props

        return (
            <select value={value} className={`${ytTablePerfix}-cell-select`} onChange={this.onChange}>
                <option value="ss">sss</option>
                <option value="sss">sss</option>
                <option value="ssss">ssss</option>
                <option value="sssss">sssss</option>
            </select>
        )
    }
}

export default SelectCell