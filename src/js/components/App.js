// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import MainHeader from './MainHeader'
import Stanza from './Stanza'
import LyricsInputButton from './LyricsInputButton'
import InputPanel from './InputPanel'

import { Song, LyricLocation } from '../song'
import { RootState } from '../reducers'
import * as actions from '../actions'

type Props = {
	updateSong: typeof actions.updateSong,
	updateOriginalLyrics: typeof actions.updateOriginalLyrics,
	updateInputState: typeof actions.updateInputState,
	updateChord: typeof actions.updateChord,
	originalLyrics: String,
	songTitle: String,
	song: Song,
	isInputOpen: Boolean,
	inputLyricLocation: LyricLocation
}

class App extends Component<Props> {
	render() {
		const {
			updateSong,
			updateOriginalLyrics,
			updateChord,
			originalLyrics,
			updateInputState,
			songTitle,
			song,
			isInputOpen,
			inputLyricLocation
		} = this.props

		const Stanzas = () => {
			return song.map((stanza, i) => {
				return (
					<Stanza
						stanzaIndex={i}
						key={i}
						stanza={stanza}
						song={song}
						updateInputState={updateInputState}
						inputLyricLocation={inputLyricLocation}
					/>
				)
			})
		}

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<LyricsInputButton
						originalLyrics={originalLyrics}
						songTitle={songTitle}
						updateSong={updateSong}
						updateOriginalLyrics={updateOriginalLyrics}
					/>
					<Header as='h1' >
						{songTitle}
					</Header>
					<Stanzas />
				</div>
				<InputPanel
					updateChord={updateChord}
					isInputOpen={isInputOpen}
					inputLyricLocation={inputLyricLocation}
					song={song}
				/>
			</div>
		)
	}
}

App.defaultProps = {
	songTitle: 'No Title'
}

function mapStatetoProps(state: RootState): Object {
	const { song, originalLyrics, songTitle, isInputOpen, inputLyricLocation } = state.lyrics
	return {
		song,
		originalLyrics,
		songTitle,
		isInputOpen,
		inputLyricLocation
	}
}

export default connect(mapStatetoProps, actions)(App)
