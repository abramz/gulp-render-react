/*! React Starter Kit | MIT License */

import React from 'react';

const anotherValidComponent = React.createClass({
	displayName: 'anotherValidComponent',
	getDefaultProps: function getDefaultProps() {
		return {
			some: 'prop',
		};
	},
	render: function render() {
		let id = 0;
		return (
			React.createElement('ul', null,
				Object.keys(this.props).map((key) => {
					return (React.createElement('li', {key: id++}, key, ' : ', this.props[key]));
				}, this)
			)
		);
	},
});

export default anotherValidComponent;
