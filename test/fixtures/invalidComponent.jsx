/*! React Starter Kit | MIT License */

/*eslint-disable */
import React from 'react';

const validComponent = React.createClass({
	getDefaultProps: () => {
		return {};
	},
	render: () => {
		let id = 0;
		return (
			<InvalidTag>
				{Object.keys(this.props).forEach((key) => {
					return (<li key={id++}>{prop.text}</li>);
				})}
			</InvalidTag>
		);
	}
});

export default validComponent;
