// @flow
import { UPDATE_STANZAS, UPDATE_ORIGINAL_LYRICS, UPDATE_INPUT_STATE, LyricsAction } from '../actions'
import { example } from '../components/example'
import { generateStanzaArray } from '../util'

export type LyricsState = {
	originalLyrics: String,
	songTitle: String,
	stanzas: Array<Array<Array<String>>>,
	isInputOpen: Boolean,
	inputLyricLocation: any
}

const initialState: LyricsState = {
	originalLyrics: example,
	songTitle: 'Hakuna Muh Potato',
	stanzas: generateStanzaArray(example),
	isInputOpen: false,
	inputLyricLocation: null
}

export default function (state: LyricsState = initialState, action: LyricsAction): LyricsState {
	switch (action.type) {
		case UPDATE_STANZAS:
			return { ...state, stanzas: action.payload }
		case UPDATE_ORIGINAL_LYRICS:
			const { originalLyrics, songTitle } = action.payload
			return { ...state, originalLyrics, songTitle }
		case UPDATE_INPUT_STATE:
			const { isInputOpen, inputLyricLocation } = action.payload
			return { ...state, isInputOpen, inputLyricLocation }
		default:
			return state
	}
}
