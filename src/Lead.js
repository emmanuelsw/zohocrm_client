import React, { Component } from 'react';
import $ from 'jquery';
import './easy-autocomplete.css';
import './easy-autocomplete.js';
import axios from 'axios';
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

const url = 'http://localhost:3001/api'

const alertOptions = {
	timeOut: 5000,
	extendedTimeOut: 1000, 
	closeButton: true,
	showAnimation: 'animated fadeInRight', 
	hideAnimation: 'animated fadeOutRight',
	escapeHtml: false
}

class Lead extends Component {

	constructor(props) {
		super(props);
		this.state = {
			leads: [],
			lead_id: '',
			phone: '',
			lead_source: 0,
			search: ''
		};
	}

	componentDidMount() {
		axios.get(url + '/v1/leads')
		.then(response => {
			this.setState({
				leads: response.data.leads
			})
		})
		.catch(err => this.handleError(err));
	}

	handleChange = (e) => {
		let newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	}
	
	handleError = (err) => {
		const errors = err.response.data.errors;
		
		if(typeof errors === 'string') {
			this.container.error(errors, "", alertOptions);
		} else {
			let errorsResponse = [];
			for(let key in errors) {
				errorsResponse.push(<li key={key}>{errors[key]}</li>)
			}
			this.container.error(errorsResponse, "", alertOptions);
		}

	}

	addByLeadID = () => {
		axios.post(url + '/v1/leads', {
			lead_id: this.state.lead_id
		})
		.then(response => {
			this.setState(prevState => ({
				leads: [...prevState.leads, response.data.lead]
			}))
			this.container.success(response.data.lead.name + ' successfully added', "", alertOptions);
		})
		.catch(err => this.handleError(err));
	}

	render() {

		let self = this
		let search_phone = $("#search_phone");

		var options = {
			getValue: "phone",
			url: function(phrase) {
				return url + "/v1/leads/search_by_phone?phone=" + phrase;
			},
			template: {
				type: "description",
				fields: {
					description: "name"
				}
			},
			list: {
				onChooseEvent: function() {
					var lead_id = search_phone.getSelectedItemData().lead_id
					console.log(lead_id)
					search_phone.val("")
					self.setState({
						lead_id: lead_id
					})
					self.addByLeadID()
				}
			}
		}

		search_phone.easyAutocomplete(options)

		const leadRows = this.state.leads.map((lead, idx) => (
			<tr key={idx}>
				<td>{lead.name}</td>
				<td>{lead.company}</td>
				<td>{lead.phone}</td>
				<td>{lead.mobile}</td>
				<td>{lead.lead_source}</td>
			</tr>
		));

		return(
			<div className="container top-space">
				<ToastContainer ref={(input) => {this.container = input;}}
					toastMessageFactory={ToastMessageFactory}
					className="toast-top-right"
					preventDuplicates={false}
				/>
				<div className="row">

					<div className="col-md-6 col-xs-12">
						<div className="well">
							<legend>Add Lead</legend>
							<hr className="title-hr"/>

							<form method="post">
								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Add by Lead ID</label>
									<div className="input-group">
										<input className="form-control" onChange={this.handleChange} name="lead_id" type="text"   placeholder="2800097000000135253"/>
										<span className="input-group-btn">
											<button onClick={this.addByLeadID} type="button" className="btn btn-default">Add!</button>
										</span>
									</div>
								</div>
							</form>

							<hr className="body-hr"/>

							<form action="" method="post">
								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Search by phone number</label>
									<input id="search_phone" className="form-control" name="phone" type="text" placeholder="555-555-5555"/>
								</div>
							</form>

						</div>
					</div>

					<div className="col-md-6 col-xs-12">
						<div className="well">
							<form action="" method="post">
								<legend>Search Lead</legend>
								<hr className="title-hr"/>
								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Search</label>
									<input onChange={this.handleChange} className="form-control" name="search" type="text" placeholder="Person Name, Phone, or Company..."/>
								</div>

								<hr className="body-hr"/>

								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Filter by Lead Source</label>
									<select value={this.state.lead_source} className="form-control" name="lead_source" onChange={this.handleChange}>
										<option disabled value="0">Select an option</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
							</form>
						</div>
					</div>

				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="well">
							<table className="table table-bordered table-striped table-hover">
								<thead>
									<tr>
										<th>Name</th>
										<th>Company</th>
										<th>Phone</th>
										<th>Mobile</th>
										<th>Lead Source</th>
									</tr>
								</thead>
								<tbody>
									{leadRows}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Lead;