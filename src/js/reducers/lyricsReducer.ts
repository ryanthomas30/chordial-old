import { Option, Some, None } from '../util/option'

import { LyricsAction, LyricsActionType as actions } from '../actions/lyricsActions'
import { example } from '../util/example'
import { Song, LyricLocation } from '../model/song'
import { newSongWithChord, ingestLyrics } from '../util/songUtil'

export type LyricsState = {
	lyrics: string,
	title: string,
	song: Song,
	isInputOpen: boolean,
	inputLyricLocation: Option<LyricLocation>
}

const initialState: LyricsState = {
	lyrics: example,
	title: 'Hakuna Muh Potato',
	song: ingestLyrics(example),
	isInputOpen: false,
	inputLyricLocation: None
}

export default function (state: LyricsState = initialState, action: LyricsAction): LyricsState {
	switch (action.type) {
		case actions.UPDATE_SONG:
			const { song } = action.payload
			return { ...state, song }
		case actions.UPDATE_LYRICS:
			const { lyrics } = action.payload
			return { ...state, lyrics }
		case actions.UPDATE_TITLE:
			const { title } = action.payload
			return { ...state, title }
		case actions.UPDATE_INPUT_STATE:
			const { isInputOpen, inputLyricLocation } = action.payload
			return { ...state, isInputOpen, inputLyricLocation }
		case actions.UPDATE_CHORD:
			const { chord, lyricLocation } = action.payload
			const newSong = newSongWithChord(state.song, chord, lyricLocation)
			return { ...state, song: newSong }
		default:
			return state
	}
}
