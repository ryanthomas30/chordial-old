// @flow
import { LyricsAction } from './lyricsActions'

/* ACTION TYPES */
export const UPDATE_SONG = 'UPDATE_SONG'
export type UPDATE_SONG_TYPE = 'UPDATE_SONG'
export const UPDATE_ORIGINAL_LYRICS = 'UPDATE_ORIGINAL_LYRICS'
export type UPDATE_ORIGINAL_LYRICS_TYPE = 'UPDATE_ORIGINAL_LYRICS'
export const UPDATE_INPUT_STATE = 'UPDATE_INPUT_STATE'
export type UPDATE_INPUT_STATE_TYPE = 'UPDATE_INPUT_STATE'
export const UPDATE_CHORD = 'UPDATE_CHORD'
export type UPDATE_CHORD_TYPE = 'UPDATE_CHORD'

export type ChordialAction =
  | LyricsAction

export * from './lyricsActions'
