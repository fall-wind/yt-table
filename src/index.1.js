import React from 'react'
import propTypes from './propTypes';
import { genInitConfig, genNewConfigByOld } from './utils';
import { Thead, Tbody } from './components';

import './index.less'

class Table extends React.PureComponent {
    static propTypes = propTypes;

    constructor(props) {
        super(props);
        const initConfig = genInitConfig(props.columns);
        this.state = {
            currentlyResizing: {},
            canCheckAllNestKeys: [],
            ...initConfig,
        };
    }

    /**
     *
     * @param {*} nextProps
     * 当columns改变时
     */
    componentWillReceiveProps(nextProps) {
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

    setStateWithData = (val, cb) => {
        this.setState({ ...val }, () => {
            if (cb) {
                cb && cb();
            }
        });
    };

    render() {
        const { className = '', ...rest } = this.props;
        return (
            <div className={`yc-table ${className}`}>
                <Thead {...rest} {...this.state} setStateWithData={this.setStateWithData} />
                <Tbody
                    {...rest}
                    {...this.state}
                    columns={this.state.flatColumns}
                    setStateWithData={this.setStateWithData}
                />
            </div>
        );
    }
}

export default Table;
