import React from 'react'
import { Sidebar, Button, Header } from 'semantic-ui-react'
import { Option, Some, None } from '../util/option'

import { Grid, GridItem } from './util/Grid'
import FlexBox from './util/FlexBox'

import { Song, LyricLocation, Chord } from '../model/song'

import actions from '../actions'

type CommonChordsProps = {
	updateChord: (c: Chord) => ReturnType<typeof actions.updateChord>,
}
const CommonChords = (props: CommonChordsProps) => {
	return (
		<div style={{ padding: '1rem' }}>
			<Header as='h3'>Common</Header>
			<FlexBox align='center' justify='center' direction='row' >
				<Button onClick={() => props.updateChord(new Chord('I'))}>I</Button>
				<Button onClick={() => props.updateChord(new Chord('I', Some(3)))}>I/3</Button>
				<Button onClick={() => props.updateChord(new Chord('ii'))}>ii</Button>
				<Button onClick={() => props.updateChord(new Chord('IV'))}>IV</Button>
				<Button onClick={() => props.updateChord(new Chord('V'))}>V</Button>
				<Button onClick={() => props.updateChord(new Chord('V', Some(7)))}>V/7</Button>
				<Button onClick={() => props.updateChord(new Chord('vi'))}>vi</Button>
			</FlexBox>
		</div>
	)
}

const AllChords = (props: CommonChordsProps) => {
	return (
		<div style={{ padding: '1rem' }}>
			<Header as='h3'>All</Header>
			<FlexBox align='center' justify='center' direction='row' >
				<Button >i</Button>
				<Button >ii</Button>
				<Button >iii</Button>
				<Button >iv</Button>
				<Button >v</Button>
				<Button >vi</Button>
				<Button >vii</Button>
				<Button >I</Button>
				<Button >II</Button>
				<Button >III</Button>
				<Button >IV</Button>
				<Button >V</Button>
				<Button >VI</Button>
				<Button >VII</Button>
				<Button >I/3</Button>
				<Button >V/7</Button>
			</FlexBox>
		</div>
	)
}

const Modifiers = (props: CommonChordsProps) => {
	return (
		<div style={{ padding: '1rem' }}>
			<Header as='h3'>Modifers</Header>
			<Header as='h5'>Accidentals</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Modifiers
			</FlexBox>
			<Header as='h5'>Inversions</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Modifiers
			</FlexBox>
			<Header as='h5'>Diminish/Augment</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Modifiers
			</FlexBox>
			<Header as='h5'>Added Tone</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Modifiers
			</FlexBox>
			<Header as='h5'>Suspended</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Modifiers
			</FlexBox>
		</div>
	)
}

const CustomChord = (props: CommonChordsProps) => {
	return (
		<div style={{ padding: '1rem' }}>
			<Header as='h3'>Custom</Header>
			<FlexBox align='center' justify='center' direction='row' >
				Custom
			</FlexBox>
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
			<GridItem column={[1, 6]} row={[4, 7]} >
				<AllChords updateChord={props.updateChord} />
			</GridItem>
			<GridItem column={[7, 4]} row={[1, 8]} >
				<Modifiers updateChord={props.updateChord} />
			</GridItem>
			<GridItem column={[7, 4]} row={[9, 2]} >
				<CustomChord updateChord={props.updateChord} />
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
	const CLASS_ROOT = 'input-panel'

	return (
		<React.Fragment>
			{inputLyricLocation.toArray().map((ill: LyricLocation) => {
				const { stanza, line, character } = ill
				return (
					<Sidebar
						visible
						direction='bottom'
						animation='overlay'
					>
						<div className={isInputOpen ? `${CLASS_ROOT}--open` : `${CLASS_ROOT}--closed`} >
							<PanelContent updateChord={(c: Chord) => updateChord(c, ill)} />
						</div>
					</Sidebar>
				)
			})}
		</React.Fragment>
	)
}
