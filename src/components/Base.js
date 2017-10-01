import React from 'react';

export const url = 'http://localhost:3001/api';

export const alertOptions = {
	timeOut: 5000,
	extendedTimeOut: 1000, 
	closeButton: true,
	showAnimation: 'animated fadeInRight', 
	hideAnimation: 'animated fadeOutRight',
	escapeHtml: false
}

export class Base extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			lead_source: '',
			lead_id: '',
			leads: []
		};
	}
	
	handleChange = (e) => {
		let newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	}

}