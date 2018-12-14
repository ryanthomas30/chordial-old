import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';

import MainHeader from './MainHeader';
import Stanza from './Stanza';
import LyricsInputButton from './LyricsInputButton';

import * as actions from '../actions';

class App extends Component {
	render() {
		const { updateStanzaArray, updateOriginalLyrics, originalLyrics, songTitle, stanzaArray } = this.props;
		const Stanzas = () => {
			return stanzaArray.map((stanza, i) => {
				return (
					<Stanza stanza={stanza} stanzaIndex={i} stanzaArray={stanzaArray} updateStanzaArray={updateStanzaArray} key={i} />
				);
			});
		};

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<LyricsInputButton originalLyrics={originalLyrics} songTitle={songTitle} updateStanzaArray={updateStanzaArray} updateOriginalLyrics={updateOriginalLyrics} />
					<Header as='h1' >
						{songTitle}
					</Header>
					<Stanzas />
				</div>
			</div>
		);
	}
}

App.defaultProps = {
	songTitle: 'No Title'
};

const mapStatetoProps = (state) => ({
	stanzaArray: state.lyrics.stanzaArray,
	originalLyrics: state.lyrics.originalLyrics,
	songTitle: state.lyrics.songTitle
});

export default connect(mapStatetoProps, actions)(App);
