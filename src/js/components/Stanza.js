// @flow
import React, { Component } from 'react'

import { Dropdown, Sidebar } from 'semantic-ui-react'

import * as lyricsActions from '../actions/lyricsActions'

type Props = {
	stanzas: Array<Array<Array<String>>>,
	stanzaIndex: Number,
	stanza: Array<Array<String>>,
	updateStanzas: typeof lyricsActions.updateStanzas
}
type State = {
	isOpen: Boolean
}

class Stanza extends Component<Props, State> {
	constructor() {
		super()

		this.state = {
			isOpen: false
		}
	}

	handleCharacterClick(e: React.SyntheticEvent) {
		e.preventDefault()
		this.setState({ isOpen: !this.state.isOpen })
	}

	_addChord(lineIndex: Number, charIndex: Number, chord: String) {
		const { stanzas, updateStanzas, stanzaIndex } = this.props
		const updatedStanzas = [...stanzas]
		for (let i = 0; i < chord.length; i++) {
			updatedStanzas[stanzaIndex][lineIndex - 1][charIndex + i] = chord[i]
		}
		updateStanzas(updatedStanzas)
	}

	render() {
		const { stanza, stanzas } = this.props
		console.log('stanza', stanza)
		console.log('stanzas', stanzas)
		const renderStanza = stanza.map((line, i) => {
			let displayLine = ''
			// ODD: Lyric Line
			if (i % 2 !== 0) {
				displayLine = line.map((c, j) => {
					// /* Might use later */
					// const characterNode = (
					// 	<span className='character' onClick={() => this._addChord(i, j)} key={j} >
					// 		{c}
					// 	</span>
					// );
					return (
						<Dropdown text={c === ' ' ? <React.Fragment>&nbsp;</React.Fragment> : c} icon={null} className='character' >
							<Dropdown.Menu>
								<Dropdown.Item text='I' onClick={() => this._addChord(i, j, 'I')} />
								<Dropdown.Item text='ii' onClick={() => this._addChord(i, j, 'ii')} />
								<Dropdown.Item text='I/3' onClick={() => this._addChord(i, j, 'I/3')} />
								<Dropdown.Item text='IV' onClick={() => this._addChord(i, j, 'IV')} />
								<Dropdown.Item text='V' onClick={() => this._addChord(i, j, 'V')} />
								<Dropdown.Item text='vi' onClick={() => this._addChord(i, j, 'vi')} />
								<Dropdown.Item text='V/7' onClick={() => this._addChord(i, j, 'V/7')} />
							</ Dropdown.Menu>
						</Dropdown>
					)
				})
			// EVEN: Chord Line
			} else {
				displayLine = line.map((c, j) => {
					return (
						<span className='character--chord' key={j} >
							{c === ' ' ? <React.Fragment>&nbsp;</React.Fragment> : c }
						</span>
					)
				})
			}
			displayLine.push(<br />)
			return (
				<React.Fragment>
					{displayLine}
				</React.Fragment>
			)
		})
		renderStanza.unshift(<br />)

		return (
			<React.Fragment>
				<button onClick={this.handleCharacterClick.bind(this)}>Toggle</button>
				<p className='character-container' >
					{renderStanza}
				</p>
				<Sidebar
					visible={this.state.isOpen}
					direction='bottom'
					animation='overlay'
				>
					<div style={{
						backgroundColor: 'white',
						height: '200px'
					}}>
						Hello, Semantic UI!
					</div>
				</Sidebar>
			</React.Fragment>
		)
	}
}

export default Stanza
