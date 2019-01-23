// @flow
import React, { Component } from 'react'
import { Form, TextArea, Modal, Button, Input } from 'semantic-ui-react'

import { ingestLyrics } from '../util/songUtil'
import lyricsActions from '../actions/lyricsActions'

type Props = {
	lyrics: string,
	title: string,
	updateSong: typeof lyricsActions.updateSong,
	updateLyrics: typeof lyricsActions.updateLyrics,
	updateTitle: typeof lyricsActions.updateTitle
}

type State = {
	modalOpen: boolean,
	lyricsInput: string,
	titleInput: string
}

class LyricsInputButton extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this._open = this._open.bind(this)
		this._submit = this._submit.bind(this)

		this.state = {
			modalOpen: false,
			lyricsInput: props.lyrics,
			titleInput: props.title
		}
	}

	_open() {
		this.setState({ modalOpen: true })
	}

	_submit() {
		const { updateSong, updateLyrics, updateTitle } = this.props
		const { lyricsInput, titleInput } = this.state
		updateLyrics(lyricsInput)
		updateTitle(titleInput)
		updateSong(ingestLyrics(lyricsInput))
		this.setState({ modalOpen: false })
	}

	render() {
		const { lyrics, title } = this.props
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
							<Input
								style={{ marginBottom: '24px' }}
								defaultValue={title}
								onChange={(e) => this.setState({ titleInput: e.target.value })}
							/>
							<TextArea
								autoHeight
								style={{ marginBottom: '24px' }}
								defaultValue={lyrics}
								onChange={(e) => this.setState({ lyricsInput: e.currentTarget.value })}
							/>
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
		)
	}
}

export default LyricsInputButton
