import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import MainHeader from './MainHeader'
import Stanza from './Stanza'
import LyricsInputButton from './LyricsInputButton'
import InputPanel from './InputPanel'

import { Option } from '../util/option'
import { Song, LyricLocation } from '../model/song'
import { RootState } from '../reducers'
import actions from '../actions'

type Props = {
	updateSong: typeof actions.updateSong,
	updateLyrics: typeof actions.updateLyrics,
	updateTitle: typeof actions.updateTitle,
	updateInputState: typeof actions.updateInputState,
	updateChord: typeof actions.updateChord,
	lyrics: string,
	title: string,
	song: Song,
	isInputOpen: boolean,
	inputLyricLocation: Option<LyricLocation>
}

class App extends Component<Props> {
	static defaultProps = {
		title: 'No Title'
	}

	render() {
		const {
			updateSong,
			updateLyrics,
			updateTitle,
			updateChord,
			updateInputState,
			lyrics,
			title,
			song,
			isInputOpen,
			inputLyricLocation
		} = this.props

		const Stanzas = () => {
			return (
				<React.Fragment>
					{song.map((stanza, i) => {
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
					})}
				</React.Fragment>
			)
		}

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<LyricsInputButton
						lyrics={lyrics}
						title={title}
						updateSong={updateSong}
						updateLyrics={updateLyrics}
						updateTitle={updateTitle}
					/>
					<Header as='h1' >
						{title}
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

function mapStatetoProps(state: RootState) {
	const { song, lyrics, title, isInputOpen, inputLyricLocation } = state.lyrics
	return {
		song,
		lyrics,
		title,
		isInputOpen,
		inputLyricLocation
	}
}

export default connect(mapStatetoProps, actions)(App)
