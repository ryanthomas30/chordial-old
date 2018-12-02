import React, { Component } from 'react';

const mapping = {
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
	small: '12px',
	medium: '24px',
	large: '48px'
};

const wrapMap = (b) => {
	return b ? 'wrap' : 'nowrap';
};

const map = (input) => {
	if (input in mapping) {
		return mapping[input];
	}
	return input;
};

class FlexBox extends Component {
	render() {
		const { direction, justify, align, wrap, title,
			margin, marginLeft, marginRight, marginTop, marginBottom,
			padding, paddingLeft, paddingRight, paddingTop, paddingBottom } = this.props;

		/* FLEX */
		const flexDirection = map(direction);
		const justifyContent = map(justify);
		const alignItems = map(align);
		const flexWrap = wrapMap(wrap);

		/* PADDING */
		const paddingObj = { padding, paddingLeft, paddingRight, paddingTop, paddingBottom };
		Object.keys(paddingObj).forEach(k => {
			paddingObj[k] = typeof paddingObj[k] === 'number' ? `${paddingObj[k]}px` : map(paddingObj[k]);
		});

		/* MARGIN */
		const marginObj = { margin, marginLeft, marginRight, marginTop, marginBottom };
		Object.keys(marginObj).forEach(k => {
			marginObj[k] = typeof marginObj[k] === 'number' ? `${marginObj[k]}px` : map(marginObj[k]);
		});

		/* Merges props with style object */
		const finalStyling = {
			display: 'flex', flexDirection, justifyContent, alignItems, flexWrap,
			...paddingObj, ...marginObj, ...this.props.style
		};

		/* Delete undefined fields */
		Object.keys(finalStyling).forEach(key => finalStyling[key] === undefined && delete finalStyling[key]);

		return (
			<div style={finalStyling} title={title} >
				{this.props.children}
			</div>
		);
	}
}

FlexBox.defaultProps = {
	direction: 'column',
	justify: 'start',
	align: 'start',
	wrap: 'wrap'
};

export default FlexBox;
