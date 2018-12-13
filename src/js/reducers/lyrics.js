import { UPDATE_STANZA_ARRAY } from '../actions';

export default function (state = {}, action) {
	switch (action.type) {
		case UPDATE_STANZA_ARRAY:
			return { ...state, stanzaArray: action.payload };
		default:
			return state;
	}
}
