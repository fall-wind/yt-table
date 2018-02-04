import React from 'react'
import PropTypes from 'prop-types'

export default function hoc(params) {
	return WarpComponent => {
		return class PP extends React.Component {

            static contextTypes = {
                setClickedValue: PropTypes.func,
            }

            onBlur = (...args) => {
                const { onBlur } = this.props
                onBlur && onBlur(args)
                this.context.setClickedValue(false)
            }

            render() {
                return <WarpComponent {...this.props} onBlur={this.onBlur}/>
            }
        }
	}
}
