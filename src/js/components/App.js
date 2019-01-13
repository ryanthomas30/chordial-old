// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header } from 'semantic-ui-react'

import MainHeader from './MainHeader'
import Stanza from './Stanza'
import LyricsInputButton from './LyricsInputButton'

import { RootState } from '../reducers'
import * as actions from '../actions'

type Props = {
	updateStanzas: typeof actions.updateStanzas,
	updateOriginalLyrics: typeof actions.updateOriginalLyrics,
	updateInputState: typeof actions.updateInputState,
	originalLyrics: String,
	songTitle: String,
	stanzas: Array<Array<Array<String>>>
}

class App extends Component<Props> {
	render() {
		const { updateStanzas, updateOriginalLyrics, originalLyrics, songTitle, stanzas } = this.props
		const Stanzas = () => {
			return stanzas.map((stanza, i) => {
				return (
					<Stanza
						stanza={stanza}
						stanzaIndex={i}
						stanzas={stanzas}
						updateStanzas={updateStanzas}
						key={i}
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
						updateStanzas={updateStanzas}
						updateOriginalLyrics={updateOriginalLyrics}
					/>
					<Header as='h1' >
						{songTitle}
					</Header>
					<Stanzas />
				</div>
			</div>
		)
	}
}

App.defaultProps = {
	songTitle: 'No Title'
}

function mapStatetoProps(state: RootState): Object {
	return {
		stanzas: state.lyrics.stanzas,
		originalLyrics: state.lyrics.originalLyrics,
		songTitle: state.lyrics.songTitle
	}
}

export default connect(mapStatetoProps, actions)(App)
