import React from 'react'
import config from './config'
const { ytTablePerfix } = config

export default function TableHeader(props) {
	const { columns, theadHeight } = props
	const usedColumns = [...columns]
	return (
		<div className={`${ytTablePerfix}-thead`}>
			{columns.map(item => {
				const { key, title, width, render, fatherTitle = {} } = item
				if (fatherTitle.title) {
					const subArr = columns.filter(
						column =>
							(column.fatherTitle || {}).title ==
							fatherTitle.title,
					)
					const index = subArr.findIndex(it => it.key === key)
					if (index === 0) {
						return (
							<div
								className={`${ytTablePerfix}-thead-cell-mul ${ytTablePerfix}-last-child-no-border`}
								key={key}
								style={{
									flex: subArr.length,
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
									{subArr.map(ele => {
										return (
											<div
												key={ele.key}
												className={`${ytTablePerfix}-thead-cell-mul-bottom-item ${ytTablePerfix}-up-down-center`}
											>
												{ele.title}
											</div>
										)
									})}
								</div>
							</div>
						)
					} else {
						return null
					}
				}
				return (
					<div
						className={`${ytTablePerfix}-thead-cell ${ytTablePerfix}-last-child-no-border ${ytTablePerfix}-up-down-center`}
						key={key}
						style={{}}
					>
						{title}
					</div>
				)
			})}
		</div>
	)
}
