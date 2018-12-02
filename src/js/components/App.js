import React, { Component } from 'react';

import { Header } from 'semantic-ui-react';

import MainHeader from './MainHeader';
import FlexBox from './custom/FlexBox';

class App extends Component {
	render() {
		return (
			<div style={{ minHeight: window.innerHeight, backgroundColor: '#FAFAFA' }} >
				<MainHeader />
				<FlexBox align='center' margin='large' padding='large' >
					<Header as='h1' >
						Hello World
					</Header>
				</FlexBox>
			</div>
		);
	}
}

export default App;
