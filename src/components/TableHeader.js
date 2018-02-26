import React from 'react'
import classnames from 'classnames'
import TableHeaderCell from './TableHeaderCell'
import config from './config'
import { getFlexWidth, pxAdd } from '../utils'

const { ytTablePerfix, defaultCellWidth } = config

function getUseArr(columns) {
    const columsObj = {}
	const useArr = []
	columns.forEach(column => {
		if (column.fatherTitle) {
			if (!columsObj[column.fatherTitle.title]) {
				try {
					const subCols = columns.filter(
						item =>
							(item.fatherTitle || {}).title ===
							column.fatherTitle.title,
					)
					columsObj[column.fatherTitle.title] = subCols
					const fatherWidth = subCols.reduce((pre, cur) => {
						return pre + (cur.width || defaultCellWidth)
					}, 0)
					useArr.push({
						key: column.fatherTitle.title,
						title: column.fatherTitle.title,
						isFather: true,
						subCols,
						width: fatherWidth,
					})
				} catch (error) {
				}
			}
		} else {
			useArr.push(column)
		}
    })
    return useArr
}

export default function TableHeader(props) {
	const { columns, draggable } = props
	const getHeaderCellCls = (isMul = false, dragValue) => {
		return {
			// [`${ytTablePerfix}-last-child-no-border`]: true,
			[`${ytTablePerfix}-thead-cell-mul`]: isMul,
			[`${ytTablePerfix}-thead-cell`]: !isMul,
			[`${ytTablePerfix}-up-down-center`]: !isMul,
			[`${ytTablePerfix}-thead-cell-draggable`]: !isMul && dragValue,
		}
    }
    const subCellCls = {
        [`${ytTablePerfix}-thead-cell-mul-bottom-item`]: true,
        [`${ytTablePerfix}-up-down-center`]: true,
        [`${ytTablePerfix}-thead-cell-draggable`]: true,
    }
    const useArr = getUseArr(columns)
	const theadWidth = useArr.reduce((pre, cur) => {
		return pre + cur.width || defaultCellWidth
	}, 0)
	return (
		<div
			style={{
				width: pxAdd(theadWidth, 1),
			}}
			className={`${ytTablePerfix}-thead`}
		>
			{useArr.map(item => {
				const { key, title, width } = item
				if (item.isFather) {
					const subCols = item.subCols
					return (
						<div
							className={classnames(
								getHeaderCellCls(true, draggable),
							)}
							key={item}
							style={{
								flex: getFlexWidth(width),
							}}
						>
							<div
								className={`${ytTablePerfix}-thead-cell-mul-top ${ytTablePerfix}-up-down-center`}
							>
								{title}
							</div>
							<div
								className={`${ytTablePerfix}-thead-cell-mul-bottom`}
							>
								{subCols.map(ele => {
									return (
										<TableHeaderCell
											{...props}
											key={ele.key}
											columnKey={ele.key}
											style={{
												flex: getFlexWidth(
													ele.width ||
														defaultCellWidth,
												),
											}}
											className={classnames(subCellCls)}
										>
											{ele.title}
										</TableHeaderCell>
									)
								})}
							</div>
						</div>
					)
				}
				return (
					<TableHeaderCell
						{...props}
						key={key}
						columnKey={key}
						style={{
							flex: getFlexWidth(width || defaultCellWidth),
						}}
						className={classnames(
							getHeaderCellCls(false, draggable),
						)}
					>
						{title}
					</TableHeaderCell>
				)
			})}
		</div>
	)
}
