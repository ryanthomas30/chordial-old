import { UPDATE_STANZA_ARRAY, UPDATE_ORIGINAL_LYRICS } from '../actions';
import { example } from '../components/example';
import { generateStanzaArray } from '../util';

const initialState = {
	originalLyrics: example,
	songTitle: 'Hakuna Muh Potato',
	stanzaArray: generateStanzaArray(example)
};

export default function (state = initialState, action) {
	switch (action.type) {
		case UPDATE_STANZA_ARRAY:
			return { ...state, stanzaArray: action.payload };
		case UPDATE_ORIGINAL_LYRICS:
			return { ...state, originalLyrics: action.payload.originalLyrics, songTitle: action.payload.songTitle };
		default:
			return state;
	}
}
