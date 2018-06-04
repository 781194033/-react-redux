/*
 * @Author: cewei
 * @Date:   2018-06-04 08:33:48
 * @Last Modified by:   cewei
 * @Last Modified time: 2018-06-04 09:23:50
 */
import React from 'react'
import PropTypes from 'prop-types'
class Provider extends React.Component {
	static childContextTypes = {
		store: PropTypes.object
	}

	getChildContext() {
		return {
			store: this.store
		}
	}
	constructor(props, context) {
		super(props, context)
		this.store = props.store
	}

	reder() {
		return this.props.children
	}
}

const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (component) => {
	return class ConnectComponent extends React.Component {
		static contextTypes = {
			store: PropTypes.object
		}

		constructor(props, context) {
			super(props, context)
			this.state = {
				props: {}
			}
		}
		componentDidMount() {
			const {
				store
			} = this.context
			store.subscribe(() => this.update())
			this.update()
		}
		update() {
			const {
				store
			} = this.context
			const stateProps = mapStateToProps(store.getState())
			const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
			this.setState({
				props: {
					...this.state.props,
					...stateProps,
					...dispatchProps
				}
			})
		}
		render() {
			return <component {...this.state.props}></component>
		}
	}
}

function bindActionCreator(creator, dispatch) {
	return (...args) => dispatch(creator(...args))
}

export function bindActionCreator(creators, dispatch) {
	return Object.keys(creators).reduce((res, cur) => {
		res[cur] = bindActionCreator(creator[cur], dispatch)
		return res
	}, {})
}