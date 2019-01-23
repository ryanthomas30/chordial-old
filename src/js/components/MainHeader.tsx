import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default (_: {}) => {
	return (
		<div>
			<Menu style={{
				borderRadius: '0px', height: '60px', paddingLeft: '12px', paddingRight: '12px',
				boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12)'
			}} className='main-header' >
				<Container>
					<Menu.Item header >Chordial</Menu.Item>
				</Container>
			</Menu>
		</div>
	)
}
