import React, { Component } from 'react';

import { Header, Form, TextArea, Modal, Button, Input } from 'semantic-ui-react';

import MainHeader from './MainHeader';
import Stanza from './Stanza';
import FlexBox from './custom/FlexBox';
import { example } from './example';

function generateStanzaArray(originalLyrics) {
	if (!originalLyrics) return [];
	/* Array of stanzas */
	/* Stanza is an array of lines */
	/* Line is array of chars */
	const stanzaArray = [];
	let currentStanza = [];
	let currentLine = [];

	const textArray = originalLyrics.split('');
	for (let i = 0; i < originalLyrics.length; i++) {
		// Line Break
		if (textArray[i] === '\n') {
			// Double Line Break; End of Stanza & Line
			if (textArray[i + 1] === '\n' || textArray[i + 1] === undefined) {
				console.log('currentLine:', currentLine);
				console.log('currentStanza:', currentStanza);
				console.log('textArray[i + 1]:', textArray[i + 1]);
				// Push line of spaces before pushing current line
				currentStanza.push(currentLine.map(c => ' '));
				currentStanza.push(currentLine);
				stanzaArray.push(currentStanza);
				currentStanza = [];
				currentLine = [];
				// Skip next line
				i++;
				// Single Line Break; End of Line
			} else {
				console.log('currentLine:', currentLine);
				// Push line of spaces before pushing current line
				currentStanza.push(currentLine.map(c => ' '));
				currentStanza.push(currentLine);
				currentLine = [];
			}
			// Final Char; End of Song & Stanza & Line
		} else if (textArray[i + 1] === undefined) {
			// Push line of spaces before pushing current line
			currentStanza.push(currentLine.map(c => ' '));
			currentLine.push(textArray[i]);
			currentStanza.push(currentLine);
			stanzaArray.push(currentStanza);
			currentStanza = [];
			currentLine = [];
			// Regular Char
		} else {
			console.log('textArray[i]:', textArray[i]);
			currentLine.push(textArray[i]);
		}
	}
	return stanzaArray;
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			originalLyrics: example,
			title: 'Hakuna Muh Potato',
			stanzaArray: generateStanzaArray(example),
			modalOpen: false
		};
	}

	render() {
		let { originalLyrics, title } = this.state;
		const { stanzaArray } = this.state;
		title = title || 'No Title';
		const textInputButton = () => (
			<Modal
				trigger={<Button primary onClick={() => this.setState({ modalOpen: true, lyricsInput: originalLyrics, titleInput: title })}>Enter Lyrics</Button>}
				open={this.state.modalOpen}
				onClose={() => this.setState({ modalOpen: false })}
			>
				<Modal.Header>Lyrics</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Form>
							<Input style={{ marginBottom: '24px' }} defaultValue={title} onChange={(e) => this.setState({ titleInput: e.target.value })} />
							<TextArea autoHeight style={{ marginBottom: '24px', overflow: 'hidden' }} defaultValue={originalLyrics} onChange={(e) => this.setState({ lyricsInput: e.target.value })} />
							<Button
								type='submit'
								content='Submit'
								primary
								onClick={ () => this.setState({
									originalLyrics: this.state.lyricsInput,
									title: this.state.titleInput,
									modalOpen: false,
									stanzaArray: generateStanzaArray(this.state.lyricsInput) })
								}
							/>
						</Form>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);

		const Stanzas = () => {
			return stanzaArray.map((stanza, i) => {
				return (
					<Stanza stanza={stanza} key={i} />
				);
			});
		};

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					{textInputButton()}
					<Header as='h1' >
						{title}
					</Header>
					<Stanzas />
				</div>
			</div>
		);
	}
}

export default App;
