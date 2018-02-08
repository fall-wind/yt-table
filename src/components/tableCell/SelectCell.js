import React from 'react'
import { tableCellChildHoc } from '../../hoc'
import { Select } from '../../common'
// import config from '../config'

// const { ytTablePerfix } = config

const Option = Select.Option
// just test
@tableCellChildHoc('select')
class SelectCell extends React.Component {
	onChange = (val, option) => {
		const { onCellChange, rowKey, cellKey } = this.props
		onCellChange && onCellChange(rowKey, cellKey, val, option)
	}

	render() {
		const { column } = this.props
		const { options } = column

		return (
			<Select onSelect={this.onChange} {...this.props}>
				{options.map(it => (
					<Option value={it.value} key={it.key}>
						{it.value}
					</Option>
				))}
			</Select>
		)
	}
}

export default SelectCell
