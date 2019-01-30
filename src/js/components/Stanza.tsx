import React from 'react'

import { Option, Some, None } from '../util/option'
import { Song, StanzaLine, LyricLocation, Chord } from '../model/song'
import lyricsActions from '../actions/lyricsActions'

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
	const chars: string[] = []
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

	return (
		<React.Fragment>
			{chars.map((c: string, key: number) => {
				return (
					<span className='character--chord' key={key} >
						{c === ' ' ? <React.Fragment>&nbsp;</React.Fragment> : c}
					</span>
				)
			})}
		</React.Fragment>
	)
}

type LyricLineProps = {
	line: string[],
	updateInputState: typeof lyricsActions.updateInputState,
	inputLyricLocation: Option<LyricLocation>,
	stanzaIndex: number,
	lineIndex: number
}

const LyricLine = (props: LyricLineProps) => {
	const { line, updateInputState, inputLyricLocation, stanzaIndex, lineIndex } = props
	const CLASS_ROOT = 'character'

	return (
		<React.Fragment>
			{line.map((c: string, charIndex: number) => {
				const selected = inputLyricLocation
					.map(
						ill => (
							ill.stanza === stanzaIndex &&
							ill.line === lineIndex &&
							ill.character === charIndex
						)
					)
					.getOrElse(false)
				const className = selected ? `${CLASS_ROOT}--highlighted` : `${CLASS_ROOT}`
				return (
					<span
						className={className}
						key={charIndex}
						onClick={() => {
							updateInputState(!selected, !selected ? Some(new LyricLocation(stanzaIndex, lineIndex, charIndex)) : None)
						}}
					>
						{c}
					</span>
				)
			})}
		</React.Fragment>
	)
}

type LineWithAnnotationsProps = {
	updateInputState: typeof lyricsActions.updateInputState,
	stanzaIndex: number,
	lineIndex: number,
	line: StanzaLine,
	inputLyricLocation: Option<LyricLocation>
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
	stanzaIndex: number,
	stanza: Array<StanzaLine>,
	inputLyricLocation: Option<LyricLocation>
}
const Stanza = (props: Props) => {
	const { stanza, stanzaIndex, updateInputState, inputLyricLocation } = props

	return (
		<div className='character-container' >
			{stanza.map((line: StanzaLine, lineIndex: number) => {
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
