// @flow
import React from 'react'

import { Song, StanzaLine, LyricLocation, Chord } from '../song'
import * as lyricsActions from '../actions/lyricsActions'

type ChordLineProps = {
	line: Chord[]
}

const ChordLine = (props: ChordLineProps) => {
	const { line } = props

	const chords = line
		.map((c, i) => {
			return { chord: c, idx: i }
		})
		.filter(c => c.chord !== null)

	let i = 0
	const chars: String[] = []
	while (chords.length > 0) {
		const { chord, idx } = chords[0]
		if (i >= idx) {
			const chordChars = chord.toString().split('')
			chars.push(...chordChars)
			chords.shift()
			i += chordChars.length
		}
		if (i < idx) {
			chars.push(...new Array(idx - i).fill(' '))
			i += idx - i
		}
	}

	if (chars.length < line.length) chars.push(...new Array(line.length - chars.length).fill(' '))

	return chars.map((c: String, key: Number) => {
		return (
			<span className='character--chord' key={key} >
				{c === ' ' ? <React.Fragment>&nbsp;</React.Fragment> : c}
			</span>
		)
	})
}

type LyricLineProps = {
	line: Chord[],
	updateInputState: typeof lyricsActions.updateInputState,
	inputLyricLocation: Number,
	stanzaIndex: Number,
	lineIndex: Number
}

const LyricLine = (props: LyricLineProps) => {
	const { line, updateInputState, inputLyricLocation, stanzaIndex, lineIndex } = props

	return line.map((c: String, charIndex: Number) => {
		const highlight: String = inputLyricLocation === null ? '' : (
			inputLyricLocation.stanza === stanzaIndex &&
			inputLyricLocation.line === lineIndex &&
			inputLyricLocation.character === charIndex
		) ? 'highlighted-character' : ''

		return (
			<span
				className={`character ${highlight}`}
				key={charIndex}
				onClick={() => {
					updateInputState(true, new LyricLocation(stanzaIndex, lineIndex, charIndex))
				}}
			>
				{c}
			</span>
		)
	})
}

type LineWithAnnotationsProps = {
	updateInputState: typeof lyricsActions.updateInputState,
	stanzaIndex: Number,
	lineIndex: Number,
	line: StanzaLine,
	inputLyricLocation: LyricLocation
}
const LineWithAnnotations = (props: LineWithAnnotationsProps) => {
	const { updateInputState, stanzaIndex, lineIndex, line, inputLyricLocation } = props
	const { chords, lyrics } = line

	return (
		<React.Fragment key={lineIndex}>
			<div className='song-line'>
				<ChordLine line={chords} />
			</div>
			<div className='song-line'>
				<LyricLine
					line={lyrics}
					updateInputState={updateInputState}
					inputLyricLocation={inputLyricLocation}
					stanzaIndex={stanzaIndex}
					lineIndex={lineIndex}
				/>
			</div>
		</React.Fragment>
	)
}

type Props = {
	updateInputState: typeof lyricsActions.updateInputState,
	song: Song,
	stanzaIndex: Number,
	stanza: Array<StanzaLine>,
	inputLyricLocation: LyricLocation
}
const Stanza = (props: Props) => {
	const { stanza, stanzaIndex, updateInputState, inputLyricLocation } = props

	return (
		<div className='character-container' >
			{stanza.map((line: StanzaLine, lineIndex: Number) => {
				return (
					<LineWithAnnotations
						key={lineIndex}
						updateInputState={updateInputState}
						stanzaIndex={stanzaIndex}
						lineIndex={lineIndex}
						line={line}
						inputLyricLocation={inputLyricLocation}
					/>
				)
			})}
		</div>
	)
}

export default Stanza
