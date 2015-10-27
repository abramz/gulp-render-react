/*! React Starter Kit | MIT License */

import React, { Component, PropTypes } from 'react';

class ValidComponent extends Component {
	static propTypes = {
		some: PropTypes.string,
	};

	static defaultProps = {
		some: 'prop',
	};

	renderElements() {
		let id = 0;
		return Object.keys(this.props).map((key) => {
			return (
				<li key={id++}>{key} : {this.props[key]}</li>
			);
		});
	}

	render() {
		return (
			<ul>{this.renderElements()}</ul>
		);
	}
}

export default ValidComponent;
