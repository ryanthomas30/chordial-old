import React from 'react'
import { Sidebar, Button } from 'semantic-ui-react'
import { Option, Some, None } from '../util/option'

import { Grid, GridItem } from './util/Grid'

import { Song, LyricLocation, Chord } from '../model/song'

import actions from '../actions'

const PanelContent = (_: {}) => {
	return (
		<Grid subdivisions={10} style={{ backgroundColor: 'green' }}>
			<GridItem column={[1, 6]} row={[1, 3]} style={{ backgroundColor: 'red' }}>
				Common
			</GridItem>
			<GridItem column={[1, 6]} row={[4, 7]} style={{ backgroundColor: 'orange' }}>
				All
			</GridItem>
			<GridItem column={[7, 4]} row={[1, 8]} style={{ backgroundColor: 'blue' }}>
				Modifiers
			</GridItem>
			<GridItem column={[7, 4]} row={[9, 2]} style={{ backgroundColor: 'yellow' }}>
				Custom
			</GridItem>
		</Grid>
	)
}

type Props = {
	updateChord: typeof actions.updateChord,
	isInputOpen: boolean,
	inputLyricLocation: Option<LyricLocation>,
	song: Song
}

export default (props: Props) => {
	const { updateChord, isInputOpen, inputLyricLocation, song } = props

	return (
		<React.Fragment>
			{inputLyricLocation.toArray().map((ill: LyricLocation) => {
				const { stanza, line, character } = ill
				return (
					<Sidebar
						visible={isInputOpen}
						direction='bottom'
						animation='overlay'
					>
						<div style={{
							backgroundColor: 'white',
							height: '350px'
						}}>
							<PanelContent />
						</div>
					</Sidebar>
				)
			})}
		</React.Fragment>
	)
}
