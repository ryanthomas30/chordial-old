// @flow
import {
	UPDATE_SONG,
	UPDATE_SONG_TYPE,
	UPDATE_ORIGINAL_LYRICS,
	UPDATE_ORIGINAL_LYRICS_TYPE,
	UPDATE_INPUT_STATE,
	UPDATE_INPUT_STATE_TYPE,
	UPDATE_CHORD,
	UPDATE_CHORD_TYPE
} from './'

import { Song, LyricLocation, Chord } from '../song'

export type UpdateSongAction = {
	type: UPDATE_SONG_TYPE,
	payload: {
		song: Song
	}
}
export function updateSong(song: Song): UpdateSongAction {
	return {
		type: UPDATE_SONG,
		payload: {
			song
		}
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
		inputLyricLocation: LyricLocation
	}
}
export function updateInputState(isInputOpen: Boolean, inputLyricLocation: LyricLocation): UpdateInputStateAction {
	return {
		type: UPDATE_INPUT_STATE,
		payload: {
			isInputOpen,
			inputLyricLocation
		}
	}
}

export type UpdateChordAction = {
	type: UPDATE_CHORD_TYPE,
	payload: {
		lyricLocation: LyricLocation,
		chord: Chord
	}
}

export function updateChord(lyricLocation: LyricLocation, chord: Chord): UpdateChordAction {
	return {
		type: UPDATE_CHORD,
		payload: {
			lyricLocation,
			chord
		}
	}
}

export type LyricsAction =
	| UpdateSongAction
	| UpdateOriginalLyricsAction
	| UpdateInputStateAction
	| UpdateChordAction
