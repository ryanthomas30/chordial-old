import { Song, LyricLocation, StanzaLine, Chord } from '../model/song'

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

export function ingestLyrics(lyrics: String): Song {
	return lyrics.split('\n\n').map((paragraph: String) => {
		return paragraph.split('\n').map((line: String) => {
			return new StanzaLine(line.split(''), new Array(line.length).fill(null))
		})
	})
}
