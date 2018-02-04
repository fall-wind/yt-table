import React from 'react'
import { Select } from '../../common'
import config from '../config'
const { ytTablePerfix } = config

const Option = Select.Option
// just test

class SelectCell extends React.Component {
	onChange = e => {
		const { onCellChange, rowKey, cellKey } = this.props
		onCellChange && onCellChange(rowKey, cellKey, e.target.value)
	}

	render() {
		const { value } = this.props

		return (
			<Select>{[1, 2, 3, 4].map(it => <Option>{it}</Option>)}</Select>
			// <select value={value} className={`${ytTablePerfix}-cell-select`} onChange={this.onChange}>
			//     <option value="ss">sss</option>
			//     <option value="sss">sss</option>
			//     <option value="ssss">ssss</option>
			//     <option value="sssss">sssss</option>
			// </select>
		)
	}
}

export default SelectCell
