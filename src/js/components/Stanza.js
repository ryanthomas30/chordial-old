import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

class Stanza extends Component {

	_addChord(lineIndex, charIndex, chord) {
		const { stanzaArray, updateStanzaArray, stanzaIndex } = this.props;
		const updatedStanzaArray = [...stanzaArray];
		for (let i = 0; i < chord.length; i++) {
			updatedStanzaArray[stanzaIndex][lineIndex - 1][charIndex + i] = chord[i];
		}
		updateStanzaArray(updatedStanzaArray);
	}

	render() {
		const { stanza } = this.props;
		const renderStanza = stanza.map((line, i) => {
			let displayLine = '';
			// ODD: Lyric Line
			if (i % 2 !== 0) {
				displayLine = line.map((c, j) => {
					/* Might use later */
					const characterNode = (
						<span className='character' onClick={() => this._addChord(i, j)} key={j} >
							{c}
						</span>
					);
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
					);
				});
			// EVEN: Chord Line
			} else {
				displayLine = line.map((c, j) => {
					return (
						<span className='character--chord' key={j} >
							{c === ' ' ? <React.Fragment>&nbsp;</React.Fragment> : c }
						</span>
					);
				});
			}
			displayLine.push(<br />);
			return (
				<React.Fragment>
					{displayLine}
				</React.Fragment>
			);
		});
		renderStanza.unshift(<br />);

		return (
			<p className='character-container' >
				{renderStanza}
			</p>
		);
	}
}

export default Stanza;
