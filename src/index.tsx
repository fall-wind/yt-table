import * as React from 'react';
import { TableProps, TableState } from './interface';
import { genInitConfig, genNewConfigByOld } from './utils';
import { Thead } from './component'

class Table<T> extends React.Component<TableProps<T>, TableState<T>> {
    constructor(props: TableProps<T>) {
        super(props);
        const initConfig = genInitConfig(props.columns);
        this.state = {
            currentlyResizing: {
                key: '',
                startX: 0,
                parentWidth: 0,
            },
            canCheckAllNestKeys: [],
            ...initConfig,
        };
    }

        /**
     *
     * @param {*} nextProps
     * 当columns改变时
     */
    componentWillReceiveProps(nextProps: TableProps<T>) {
        if (nextProps.columns !== this.props.columns) {
            const newConfig = genNewConfigByOld({
                newColumn: nextProps.columns,
                oldColumn: this.state.columns,
                oldResized: this.state.resized,
            });
            if (newConfig) {
                this.setState(newConfig);
            }
        }
    }

    setStateWithData = (val: any, cb: () => void) => {
        this.setState({ ...val }, () => {
            if (cb) {
                cb && cb();
            }
        });
    };

	render() {
        const { className = '', ...rest } = this.props;
        const { resized, columns, currentlyResizing } = this.state
		return (
			<div className={`yc-table ${className}`}>
				<Thead
                    {...rest}
                    resized={resized}
                    columns={columns}
                    setStateWithData={this.setStateWithData}
                    currentlyResizing={currentlyResizing}
				/>
			</div>
		);
	}
}

export default Table;
