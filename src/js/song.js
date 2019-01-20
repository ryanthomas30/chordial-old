// @flow
export class LyricLocation {
	constructor(stanza: Number, line: Number, character: Number) {
		this.stanza = stanza
		this.line = line
		this.character = character
	}
}

export class StanzaLine {
	constructor(lyrics: String[], chords: String[]) {
		this.lyrics = lyrics
		this.chords = chords
	}
}

export type MajorBaseNote =
	| "I"
	| "II"
	| "III"
	| "IV"
	| "V"
	| "VI"
	| "VII"

export type MinorBaseNote =
	| "i"
	| "ii"
	| "iii"
	| "iv"
	| "v"
	| "vi"
	| "vii"

export type BaseNote =
	| MajorBaseNote
	| MinorBaseNote

export type AccidentalType =
	| "SHARP"
	| "FLAT"

export class Accidental {
	type: AccidentalType
	degree: Number

	constructor(type: AccidentalType, degree: Number) {
		this.type = type
		this.degree = degree
	}

	toString(): String {
		const { type, degree } = this
		const accidental = type === 'SHARP' ? '♯' : '♭'

		let s = ''
		for (let i = 0; i < degree; i++) {
			s += accidental
		}

		return s
	}
}

export const ChordModifiers = {
	AUGMENTED: '+',
	DIMINISHED: 'o',
	SIXTH: '6',
	SEVENTH: '7',
	NINTH: '9',
	ELEVENTH: '11',
	SUS: 'sus',
	SUS2: 'sus2',
	SUS4: 'sus4'
}

export type AUGMENTED = "+"
export type DIMINISHED = "o"
export type DimAug =
	| AUGMENTED
	| DIMINISHED

export type SIXTH = "6"
export type SEVENTH = "7"
export type NINTH = "9"
export type ELEVENTH = "11"
export type AddedTone =
	| SIXTH
	| SEVENTH
	| NINTH
	| ELEVENTH

export type SUS = "sus"
export type SUS2 = "sus2"
export type SUS4 = "sus4"
export type Sus =
	| SUS
	| SUS2
	| SUS4

export type ChordModifier =
	| DimAug
	| AddedTone
	| Sus

export class Chord {
	base: String
	accidental: ?Accidental
	inversion: ?Number
	dimAug: ?DimAug
	addedTone: ?AddedTone
	sus: ?Sus

	constructor(base: BaseNote, accidental: ?Accidental, inversion: ?Number, dimAug: ?DimAug, addedTone: ?AddedTone, sus: ?Sus) {
		this.base = base
		this.accidental = accidental
		this.inversion = inversion
		this.dimAug = dimAug
		this.addedTone = addedTone
		this.sus = sus
	}

	toString(): String {
		const { base, accidental, inversion, dimAug, addedTone, sus } = this

		let chord = base
		if (accidental) chord += accidental.toString()
		if (inversion) chord += `/${inversion}`
		if (dimAug) chord += dimAug
		if (addedTone) chord += addedTone
		if (sus) chord += sus

		return chord
	}
}

export type Song = StanzaLine[][]

export function ingestLyrics(lyrics: String): Song {
	const paragraphs = lyrics.split('\n\n')

	return paragraphs.map((paragraph: String) => {
		return paragraph.split('\n').map((line: String) => {
			return new StanzaLine(line.split(''), new Array(line.length).fill(null))
		})
	})
}
