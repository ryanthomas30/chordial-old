import React, { Component, ReactNode } from 'react'

type ItemAlignType = 'start' | 'end' | 'center' | 'stretch'
type GridAlignType =
	| 'start'
	| 'end'
	| 'center'
	| 'stretch'
	| 'space-around'
	| 'space-between'
	| 'space-evenly'

type GridProps = {
	children: ReactNode,
	style?: React.CSSProperties,
	inline?: boolean,
	subdivisions?: number,
	stretchHeight?: boolean,
	columnTemplate?: string,
	rowTemplate?: string,
	gap?: string,
	columnGap?: string,
	rowGap?: string,
	itemAlign?: ItemAlignType,
	itemAlignX?: ItemAlignType,
	itemAlignY?: ItemAlignType,
	gridAlign?: GridAlignType,
	gridAlignX?: GridAlignType,
	gridAlignY?: GridAlignType
}

const subdivide = (subdivisions: number) => {
	const width = (100 / subdivisions).toFixed(2)
	return Array(subdivisions).fill(width).join('% ').trim().concat('%')
}

export class Grid extends Component<GridProps> {
	render() {
		const props = this.props
		const display = props.inline ? 'inline-grid' : 'grid'

		const subdivisions = props.subdivisions ? subdivide(props.subdivisions) : 'auto'
		const columnTemplate = props.columnTemplate || subdivisions
		const rowTemplate = props.rowTemplate || subdivisions

		const gap = props.gap || '0'
		const columnGap = props.columnGap || gap
		const rowGap = props.rowGap || gap

		const itemAlign = props.itemAlign || 'stretch'
		const itemAlignX = props.itemAlignX || itemAlign
		const itemAlignY = props.itemAlignY || itemAlign

		const gridAlign = props.gridAlign || 'stretch'
		const gridAlignX = props.gridAlignX || gridAlign
		const gridAlignY = props.gridAlignY || gridAlign

		const height = (() => {
			if (props.stretchHeight === undefined) return { height: '100%' }
			else props.stretchHeight ? { height: '100%' } : {}
		})()

		return (
			<div style={{
				display,
				gridTemplateColumns: columnTemplate,
				gridTemplateRows: rowTemplate,
				gridColumnGap: columnGap,
				gridRowGap: rowGap,
				justifyItems: itemAlignX,
				alignItems: itemAlignY,
				justifyContent: gridAlignX,
				alignContent: gridAlignY,
				...height,
				...props.style
			}}>
				{props.children}
			</div>
		)
	}
}

type GridItemProps = {
	children: ReactNode,
	style?: React.CSSProperties,
	columnStart?: number | string,
	columnEnd?: number | string,
	columnWidth?: number,
	column?: [number, number],
	rowStart?: number | string,
	rowEnd?: number | string,
	rowWidth?: number,
	row?: [number, number],
	align?: ItemAlignType,
	alignX?: ItemAlignType,
	alignY?: ItemAlignType
}

export const GridItem = (props: GridItemProps) => {
	const columnStart = props.column ? props.column[0] : props.columnStart || 1
	const columnWidth = props.columnWidth ? `/ span ${props.columnWidth}` : '/ span 1'
	const columnEnd = props.column ? `/ span ${props.column[1]}` : props.columnEnd || columnWidth
	const gridColumn = `${columnStart} ${columnEnd}`

	const rowStart = props.row ? props.row[0] : props.rowStart || 1
	const rowWidth = props.rowWidth ? `/ span ${props.rowWidth}` : '/ span 1'
	const rowEnd = props.row ? `/ span ${props.row[1]}` : props.rowEnd || rowWidth
	const gridRow = `${rowStart} ${rowEnd}`

	const align = props.align || 'stretch'
	const alignX = props.alignX || align
	const alignY = props.alignY || align

	return (
		<div style={{
			gridColumn,
			gridRow,
			justifySelf: alignX,
			alignSelf: alignY,
			...props.style
		}}>
			{props.children}
		</div>
	)
}
