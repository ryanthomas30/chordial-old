import React, { Component } from 'react'

interface mappingType {
	start: string
	end: string
	between: string
	small: string
	medium: string
	large: string
}

const mapping: any = {
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
	small: '12px',
	medium: '24px',
	large: '48px'
}

const wrapMap = (b: boolean) => {
	return b ? 'wrap' : 'nowrap'
}

const map = (input: string) => {
	if (input in mapping) {
		return mapping[input]
	}
	return input
}

type Props = {
	direction: 'row' | 'column'
	justify: 'start' | 'end' | 'between'
	align: 'start' | 'end' | 'between'
	wrap: boolean
	margin: 'small' | 'medium' | 'large' | number
	marginLeft: 'small' | 'medium' | 'large' | number
	marginRight: 'small' | 'medium' | 'large' | number
	marginTop: 'small' | 'medium' | 'large' | number
	marginBottom: 'small' | 'medium' | 'large' | number
	padding: 'small' | 'medium' | 'large' | number
	paddingLeft: 'small' | 'medium' | 'large' | number
	paddingRight: 'small' | 'medium' | 'large' | number
	paddingTop: 'small' | 'medium' | 'large' | number
	paddingBottom: 'small' | 'medium' | 'large' | number
	style: object
}

class FlexBox extends Component<Props> {
	static defaultProps = {
		direction: 'column',
		justify: 'start',
		align: 'start',
		wrap: 'wrap'
	}
	render() {
		const { direction, justify, align, wrap,
			margin, marginLeft, marginRight, marginTop, marginBottom,
			padding, paddingLeft, paddingRight, paddingTop, paddingBottom, ...other } = this.props

		/* FLEX */
		const flexDirection = direction
		const justifyContent = map(justify)
		const alignItems = map(align)
		const flexWrap = wrapMap(wrap)

		/* PADDING */
		
		const paddingObj: any = { padding, paddingLeft, paddingRight, paddingTop, paddingBottom }
		Object.keys(paddingObj).forEach((k: string) => {
			paddingObj[k] = typeof paddingObj[k] === 'number' ? `${paddingObj[k]}px` : map(paddingObj[k])
		})

		/* MARGIN */
		const marginObj: any = { margin, marginLeft, marginRight, marginTop, marginBottom }
		Object.keys(marginObj).forEach(k => {
			marginObj[k] = typeof marginObj[k] === 'number' ? `${marginObj[k]}px` : map(marginObj[k])
		})

		/* Merges props with style object */
		const finalStyling = {
			display: 'flex', flexDirection, justifyContent, alignItems, flexWrap,
			...paddingObj, ...marginObj, ...this.props.style
		}

		/* Delete undefined fields */
		Object.keys(finalStyling).forEach(key => finalStyling[key] === undefined && delete finalStyling[key])

		return (
			<div style={finalStyling} {...other} >
				{this.props.children}
			</div>
		)
	}
}

export default FlexBox
