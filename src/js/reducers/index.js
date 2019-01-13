// @flow
import { combineReducers, Reducer } from 'redux'
import lyrics, { LyricsState } from './lyricsReducer'
import { ChordialAction } from '../actions'

export type RootState = {
 lyrics: LyricsState
}

const rootReducer: Reducer<RootState, ChordialAction> = combineReducers({
	lyrics
})

export default rootReducer
