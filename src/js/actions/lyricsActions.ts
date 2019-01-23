import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import { Option } from '../util/option'
import { Song, LyricLocation, Chord } from '../model/song'

export enum LyricsActionType {
	UPDATE_SONG = '[lyrics]-update-song',
	UPDATE_LYRICS = '[lyrics]-update-lyrics',
	UPDATE_TITLE = '[lyrics]-update-title',
	UPDATE_INPUT_STATE = '[lyrics]-update-input-state',
	UPDATE_CHORD = '[lyrics]-update-chord'
}

const actions = {
	updateSong: (song: Song) => createAction(LyricsActionType.UPDATE_SONG, { song }),
	updateLyrics: (lyrics: string) => createAction(LyricsActionType.UPDATE_LYRICS, { lyrics }),
	updateTitle: (title: string) => createAction(LyricsActionType.UPDATE_TITLE, { title }),
	updateInputState: (isInputOpen: boolean, inputLyricLocation: Option<LyricLocation>) =>
		createAction(LyricsActionType.UPDATE_INPUT_STATE, { isInputOpen, inputLyricLocation }),
	updateChord: (chord: Chord, lyricLocation: LyricLocation) =>
		createAction(LyricsActionType.UPDATE_CHORD, { chord, lyricLocation })
}

export type LyricsAction = ActionsUnion<typeof actions>

export default actions
