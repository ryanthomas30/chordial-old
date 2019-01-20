// @flow
import React from 'react'
import { Sidebar, Button } from 'semantic-ui-react'

import { Song, LyricLocation, Chord } from '../song'

import * as actions from '../actions'

const BaseInput = (props) => {
	return (
		<React.Fragment>
			<Button>I</Button>
			<Button>II</Button>
			<Button>III</Button>
			<Button>IV</Button>
			<Button>V</Button>
			<Button>VI</Button>
			<Button>VII</Button>
		</React.Fragment>
	)
}

type Props = {
	updateChord: typeof actions.updateChord,
	isInputOpen: Boolean,
	inputLyricLocation: ?LyricLocation,
	song: Song
}

export default (props: Props) => {
	const { updateChord, isInputOpen, inputLyricLocation, song } = props

	if (inputLyricLocation === null) return null

	const { stanza, line, character } = inputLyricLocation
	return (
		<Sidebar
			visible={isInputOpen}
			direction='bottom'
			animation='overlay'
		>
			<div style={{
				backgroundColor: 'white',
				height: '200px'
			}}>
				<div>
					POSITION = (Stanza: {stanza} Line: {line} Character: {character})
				</div>
				<div>
					CHARACTER = {song[stanza][line].lyrics[character]}
				</div>

				<button onClick={() => updateChord(inputLyricLocation, new Chord('I', null, 3))}>
					Add Chord
				</button>

				<BaseInput />
			</div>
		</Sidebar >
	)
}
