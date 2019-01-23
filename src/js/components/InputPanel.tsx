// @flow
import React from 'react'
import { Sidebar, Button } from 'semantic-ui-react'
import { Option, Some, None } from '../util/option'

import { Song, LyricLocation, Chord } from '../model/song'

import actions from '../actions'

const BaseInput = (_: {}) => {
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
							height: '200px'
						}}>
							<div>
								POSITION = (Stanza: {stanza} Line: {line} Character: {character})
						</div>
							<div>
								CHARACTER = {song[stanza][line].lyrics[character]}
							</div>

							<button onClick={() => updateChord(new Chord('I', None, Some(3)), ill)}>
								Add Chord
						</button>

							<BaseInput />
						</div>
					</Sidebar >
				)
			})}
		</React.Fragment>
	)
}
