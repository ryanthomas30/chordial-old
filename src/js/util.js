// @flow
import { Song, LyricLocation, StanzaLine, Chord } from './song'

// @flow
export function generateStanzaArray(originalLyrics: String): Array<Array<StanzaLine>> {
	if (!originalLyrics) return []
	/* Array of stanzas */
	/* Stanza is an array of lines */
	/* Line is array of chars */
	const stanzaArray = []
	let currentStanza = []
	let currentLine = []

	// stanzaArray stanzaIndex[] lineIndex[] charIndex[]

	const textArray = originalLyrics.split('')
	for (let i = 0; i < originalLyrics.length; i++) {
		// Line Break
		if (textArray[i] === '\n') {
			// Double Line Break; End of Stanza & Line
			if (textArray[i + 1] === '\n' || textArray[i + 1] === undefined) {
				// console.log('currentLine:', currentLine)
				// console.log('currentStanza:', currentStanza)
				// console.log('textArray[i + 1]:', textArray[i + 1])
				// Push line of spaces before pushing current line
				currentStanza.push(currentLine.map(c => ' '))
				currentStanza.push(currentLine)
				stanzaArray.push(currentStanza)
				currentStanza = []
				currentLine = []
				// Skip next line
				i++
				// Single Line Break; End of Line
			} else {
				// console.log('currentLine:', currentLine)
				// Push line of spaces before pushing current line
				currentStanza.push(currentLine.map(c => ' '))
				currentStanza.push(currentLine)
				currentLine = []
			}
			// Final Char; End of Song & Stanza & Line
		} else if (textArray[i + 1] === undefined) {
			// Push line of spaces before pushing current line
			currentStanza.push(currentLine.map(c => ' '))
			currentLine.push(textArray[i])
			currentStanza.push(currentLine)
			stanzaArray.push(currentStanza)
			currentStanza = []
			currentLine = []
			// Regular Char
		} else {
			// console.log('textArray[i]:', textArray[i])
			currentLine.push(textArray[i])
		}
	}
	return stanzaArray
}

export function newSongWithChord(song: Song, chord: Chord, lyricLocation: LyricLocation): Song {
	return song.map((stanza, stanzaIdx) => {
		if (stanzaIdx !== lyricLocation.stanza) return stanza

		return stanza.map((line, lineIdx) => {
			if (lineIdx !== lyricLocation.line) return line

			const newChordLine = line.chords.map((currentChord, chordIdx) => {
				if (chordIdx !== lyricLocation.character) return currentChord
				return chord
			})

			return new StanzaLine([...line.lyrics], newChordLine)
		})
	})
}
