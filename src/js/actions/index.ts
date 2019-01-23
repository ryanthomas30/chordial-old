import lyricsActions, { LyricsAction } from './lyricsActions'

const chordialActions = {
	...lyricsActions
}

export type ChordialAction =
	| LyricsAction

export default chordialActions
