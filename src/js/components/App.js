import React, { Component } from 'react';

import { Header, Form, TextArea } from 'semantic-ui-react';

import MainHeader from './MainHeader';
import Stanza from './Stanza';
import FlexBox from './custom/FlexBox';

class App extends Component {
	constructor(props) {
		super(props);

		this._onInputChange = this._onInputChange.bind(this);

		this.state = {
			originalText: ''
		};
	}

	_onInputChange(e) {
		this.setState({ originalText: e.target.value });
	}

	render() {
		const { originalText } = this.state;
		console.log('originalText:', originalText);
		const wasNewline = false;
		const displayText = originalText.split('').map(c => {
			switch (c) {
				case '\n':
					if (wasNewline) {
						// wasNewline = false;
						return (
							<span>&nbsp;</span>
						);
					}
					// wasNewline = true;
					return (
						<React.Fragment>
							<br/><br/>
						</React.Fragment>
					);
				default:
					// wasNewline = false;
					return <span className='character' >{c}</span>;
			}
		});
		displayText.unshift(
			<React.Fragment>
				<br/><br/>
			</React.Fragment>
		);
		/* Array of stanzas */
		/* Stanza is an array of lines */
		/* Line is array of chars */
		const stanzaArray = [];
		let currentStanza = [];
		let currentLine = [];
		const textArray = originalText.split('');
		for (let i = 0; i < originalText.length; i++) {
			// Line Break
			if (textArray[i] === '\n') {
				// Double Line Break; End of Stanza
				if (textArray[i + 1] === '\n' || textArray[i + 1] === undefined) {
					console.log('currentLine:', currentLine);
					console.log('currentStanza:', currentStanza);
					console.log('textArray[i + 1]:', textArray[i + 1]);
					currentStanza.push(currentLine);
					stanzaArray.push(currentStanza);
					currentStanza = [];
					currentLine = [];
					i++;
				// Single Line Break; End of Line
				} else {
					console.log('currentLine:', currentLine);
					currentStanza.push(currentLine);
					currentLine = [];
				}
			} else if (textArray[i + 1] === undefined) {
				currentStanza.push(currentLine);
				stanzaArray.push(currentStanza);
				currentStanza = [];
				currentLine = [];
			} else {
				console.log('textArray[i]:', textArray[i]);
				currentLine.push(textArray[i]);
			}
		}

		console.log('stanzaArray:', stanzaArray);

		const Stanzas = () => {
			return stanzaArray.map(stanza => {
				return (
					<Stanza stanza={stanza} />
				);
			});
		};

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<Header as='h1' >
						Hakuna Mungu Kama Wewe
					</Header>
					<Form>
						<TextArea autoHeight onChange={(e) => this._onInputChange(e)} />
					</Form>
					<Stanzas />
				</div>
			</div>
		);
	}
}

export default App;
