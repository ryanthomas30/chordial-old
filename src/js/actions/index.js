// @flow
import { LyricsAction } from './lyricsActions'

/* ACTION TYPES */
export const UPDATE_STANZAS = 'UPDATE_STANZAS'
export type UPDATE_STANZAS_TYPE = 'UPDATE_STANZAS'
export const UPDATE_ORIGINAL_LYRICS = 'UPDATE_ORIGINAL_LYRICS'
export type UPDATE_ORIGINAL_LYRICS_TYPE = 'UPDATE_ORIGINAL_LYRICS'
export const UPDATE_INPUT_STATE = 'UPDATE_INPUT_STATE'
export type UPDATE_INPUT_STATE_TYPE = 'UPDATE_INPUT_STATE'

export type ChordialAction =
  | LyricsAction

export * from './lyricsActions'
