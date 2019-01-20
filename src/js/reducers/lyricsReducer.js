// @flow
import {
	UPDATE_SONG,
	UPDATE_ORIGINAL_LYRICS,
	UPDATE_INPUT_STATE,
	UPDATE_CHORD,
	LyricsAction
} from '../actions'
import { example } from '../components/example'
import { ingestLyrics, Song, LyricLocation } from '../song'
import { newSongWithChord } from '../util'

export type LyricsState = {
	originalLyrics: String,
	songTitle: String,
	song: Song,
	isInputOpen: Boolean,
	inputLyricLocation: ?LyricLocation
}

const initialState: LyricsState = {
	originalLyrics: example,
	songTitle: 'Hakuna Muh Potato',
	song: ingestLyrics(example),
	isInputOpen: false,
	inputLyricLocation: null
}

export default function (state: LyricsState = initialState, action: LyricsAction): LyricsState {
	switch (action.type) {
		case UPDATE_SONG:
			const { song } = action.payload
			return { ...state, song }
		case UPDATE_ORIGINAL_LYRICS:
			const { originalLyrics, songTitle } = action.payload
			return { ...state, originalLyrics, songTitle }
		case UPDATE_INPUT_STATE:
			const { isInputOpen, inputLyricLocation } = action.payload
			return { ...state, isInputOpen, inputLyricLocation }
		case UPDATE_CHORD:
			const { chord, lyricLocation } = action.payload
			const newSong = newSongWithChord(state.song, chord, lyricLocation)
			return { ...state, song: newSong }
		default:
			return state
	}
}
