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
			current_page: 1,
			total_count: 1,
			per_page: 10,
			lead_id: '',
			leads: [],
			search: ''
		};
	}
	
	handleChange = (e) => {
		let newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	}

	handleError = (err) => {
		if(err.response) {
			const errors = err.response.data.errors;
			if(typeof errors === 'string') {
				this.errorAlert(errors);
			} else {
				let errorsResponse = [];
				for(let key in errors) {
					errorsResponse.push(<li key={key}>{errors[key]}</li>)
				}
				this.errorAlert(errorsResponse);
			}
		} else {
			this.errorAlert("Could not connect to API");
		}
	}

	errorAlert = (msg) => {
		this.container.error(msg, "", alertOptions);
	}

	successAlert = (msg) => {
		this.container.success(msg, "", alertOptions);
	}

	clearLeadSource = (e) => {
		this.setState({lead_source: ''});
	}

	clearSearch = (e) => {
		this.setState({search: ''});
	}

}