// @flow
import {
	UPDATE_STANZAS,
	UPDATE_STANZAS_TYPE,
	UPDATE_ORIGINAL_LYRICS,
	UPDATE_ORIGINAL_LYRICS_TYPE,
	UPDATE_INPUT_STATE,
	UPDATE_INPUT_STATE_TYPE
} from '.'

export type UpdateStanzasAction = {
	type: UPDATE_STANZAS_TYPE,
	payload: Array<Array<Array<String>>>
}
export function updateStanzas(stanzas: Array<Array<Array<String>>>): UpdateStanzasAction {
	return {
		type: UPDATE_STANZAS,
		payload: stanzas
	}
}

export type UpdateOriginalLyricsAction = {
	type: UPDATE_ORIGINAL_LYRICS_TYPE,
	payload: {
		originalLyrics: String,
		songTitle: String
	}
}
export function updateOriginalLyrics(newLyrics: String, newTitle: String): UpdateOriginalLyricsAction {
	return {
		type: UPDATE_ORIGINAL_LYRICS,
		payload: {
			originalLyrics: newLyrics,
			songTitle: newTitle
		}
	}
}

export type UpdateInputStateAction = {
	type: UPDATE_INPUT_STATE_TYPE,
	payload: {
		isInputOpen: Boolean,
		inputLyricLocation: any
	}
}
export function updateInputState(isInputOpen: Boolean, inputLyricLocation: any): UpdateInputStateAction {
	return {
		type: UPDATE_INPUT_STATE,
		payload: {
			isInputOpen,
			inputLyricLocation
		}
	}
}

export type LyricsAction =
	| UpdateStanzasAction
	| UpdateOriginalLyricsAction
	| UpdateInputStateAction
