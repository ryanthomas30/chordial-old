import React, { Component } from 'react';

class Stanza extends Component {
	render() {
		const { stanza } = this.props;
		const renderStanza = stanza.map(line => {
			const displayLine = line.map(c => {
				return (
					<span className='character' >
						{c}
					</span>
				);
			});
			displayLine.push(<br />);
			displayLine.push(<br />);
			return displayLine;
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
