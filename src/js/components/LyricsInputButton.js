import React, { Component } from 'react';

import { Form, TextArea, Modal, Button, Input } from 'semantic-ui-react';

import { generateStanzaArray } from '../util';

class LyricsInputButton extends Component {
	constructor(props) {
		super(props);

		this._open = this._open.bind(this);
		this._submit = this._submit.bind(this);

		this.state = { modalOpen: false };
	}

	_open() {
		const { originalLyrics, songTitle } = this.props;
		this.setState({ modalOpen: true, lyricsInput: originalLyrics, titleInput: songTitle });
	}

	_submit() {
		const { updateStanzaArray, updateOriginalLyrics } = this.props;
		const { lyricsInput, titleInput } = this.state;
		updateOriginalLyrics(lyricsInput, titleInput);
		updateStanzaArray(generateStanzaArray(lyricsInput));
		this.setState({ modalOpen: false });
	}

	render() {
		const { originalLyrics, songTitle } = this.props;
		return (
			<Modal
				trigger={<Button primary onClick={this._open}>Enter Lyrics</Button>}
				open={this.state.modalOpen}
				onClose={() => this.setState({ modalOpen: false })}
			>
				<Modal.Header>Lyrics</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Form>
							<Input style={{ marginBottom: '24px' }} defaultValue={songTitle} onChange={(e) => this.setState({ titleInput: e.target.value })} />
							<TextArea autoHeight style={{ marginBottom: '24px' }} defaultValue={originalLyrics} onChange={(e) => this.setState({ lyricsInput: e.target.value })} />
							<Button
								type='submit'
								content='Submit'
								primary
								onClick={this._submit}
							/>
						</Form>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default LyricsInputButton;
