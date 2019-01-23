import { Option, Some, None } from '../util/option'

export class LyricLocation {
	constructor(
		readonly stanza: number,
		readonly line: number,
		readonly character: number
	) { }
}

export class StanzaLine {
	constructor(readonly lyrics: Array<string>, readonly chords: Array<Chord>) { }
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
	constructor(readonly type: AccidentalType, readonly degree: number) { }

	toString(): string {
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
	constructor(
		readonly base: BaseNote,
		readonly accidental: Option<Accidental> = None,
		readonly inversion: Option<number> = None,
		readonly dimAug: Option<DimAug> = None,
		readonly addedTone: Option<AddedTone> = None,
		readonly sus: Option<Sus> = None
	) { }

	toString(): string {
		const { base, accidental, inversion, dimAug, addedTone, sus } = this

		let chord = base
		accidental.foreach(a => chord += a.toString())
		inversion.foreach(i => chord += `/${i}`)
		dimAug.foreach(da => chord += da)
		addedTone.foreach(at => chord += at)
		sus.foreach(s => chord += s)

		return chord
	}
}

export type Song = Array<Array<StanzaLine>>
