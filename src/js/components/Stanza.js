import React, { Component } from 'react';

class Stanza extends Component {
	render() {
		const { stanza } = this.props;
		const renderStanza = stanza.map((line, i) => {
			let displayLine = '';
			// ODD: Lyric Line
			if (i % 2 !== 0) {
				displayLine = line.map((c, j) => {
					return (
						<span className='character' key={j} >
							{c}
						</span>
					);
				});
			// EVEN: Chord Line
			} else {
				displayLine = line.map((c, j) => {
					console.log('c:', c);
					return (
						<span className='character' key={j} >
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
