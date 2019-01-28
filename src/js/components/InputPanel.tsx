import React from 'react'
import { Sidebar, Button, Header } from 'semantic-ui-react'
import { Option, Some, None } from '../util/option'

import { Grid, GridItem } from './util/Grid'

import { Song, LyricLocation, Chord } from '../model/song'

import actions from '../actions'

type CommonChordsProps = {
	updateChord: (c: Chord) => ReturnType<typeof actions.updateChord>,
}
const CommonChords = (props: CommonChordsProps) => {
	return (
		<div style={{ padding: '1rem' }}>
			<Header as='h3'>Common</Header>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button onClick={() => props.updateChord(new Chord('I'))}>I</Button>
				<Button onClick={() => props.updateChord(new Chord('I', Some(3)))}>I/3</Button>
				<Button onClick={() => props.updateChord(new Chord('ii'))}>ii</Button>
				<Button onClick={() => props.updateChord(new Chord('IV'))}>IV</Button>
				<Button onClick={() => props.updateChord(new Chord('V'))}>V</Button>
				<Button onClick={() => props.updateChord(new Chord('V', Some(7)))}>V/7</Button>
				<Button onClick={() => props.updateChord(new Chord('vi'))}>vi</Button>
			</div>
		</div>
	)
}

type PanelContentProps = {
	updateChord: (c: Chord) => ReturnType<typeof actions.updateChord>,
}
const PanelContent = (props: PanelContentProps) => {
	return (
		<Grid subdivisions={10}>
			<GridItem column={[1, 6]} row={[1, 3]}>
				<CommonChords updateChord={props.updateChord} />
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
							<PanelContent updateChord={(c: Chord) => updateChord(c, ill)} />
						</div>
					</Sidebar>
				)
			})}
		</React.Fragment>
	)
}
