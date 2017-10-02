import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Base, url } from './Base';
import Pagination from 'react-js-pagination';
import { ToastContainer, ToastMessage } from 'react-toastr';
import ActionCable from 'actioncable';
const Toast = React.createFactory(ToastMessage.animation);
const cable = ActionCable.createConsumer('ws://localhost:3001/api/v1/cable');

class Lead extends Base {

	componentDidMount = () => {
		this.fetchLeads();
		cable.subscriptions.create({channel: 'LeadChannel'}, {
			received: (data) => {
				if (data.action === "new lead") {
					this.setState(prevState => ({
						leads: [data.message, ...prevState.leads]
					}))
				}
			}
		});
	}

	handlePageChange = (page) => {
    this.setState({current_page: page}, () => {
			if (this.state.search) {
				this.searchGlobal();
			} else if(this.state.lead_source) {
				this.searchLeadSource();
			} else {
				this.fetchLeads();
			}
		});
	}

	// Get all leads
	fetchLeads = () => {
		axios.get(url + '/v1/leads', {
			params: {
				page: this.state.current_page,
				size: this.state.per_page
			}
		})
		.then(response => {
			this.setState({
				leads: response.data.leads,
				current_page: response.data.meta.current_page,
				total_count: response.data.meta.total_count
			})
		})
		.catch(err => this.handleError(err));
	}
	
	// Add record by Lead ID
	addByLeadID = () => {
		axios.post(url + '/v1/leads', {
			lead_id: this.state.lead_id
		})
		.then(response => {
			this.setState(prevState => ({
				leads: [response.data.lead, ...prevState.leads]
			}))
			this.setState({lead_id: ''})
			this.inputLeadID.value = "";
			this.successAlert(response.data.lead.name + ' successfully added');
		})
		.catch(err => this.handleError(err));
	}

	// Search by name, phone or company
	searchGlobal = (e) => {
		let value = ((e) ? e.target.value : this.state.search)
    this.setState({search: value}, () => {
			axios.get(url + '/v1/leads/search', {
				params: {
					q: this.state.search,
					page: this.state.current_page,
					size: this.state.per_page
				}
			})
			.then(response => {
				this.setState({
					leads: response.data.leads,
					current_page: response.data.meta.current_page,
					total_count: response.data.meta.total_count
				})
			})
			.catch(err => this.handleError(err));
		});
	}

	// Search by lead source
	searchLeadSource = (e) => {
		let value = ((e) ? e.target.value : this.state.lead_source)
		this.setState({lead_source: value}, () => {
			axios.get(url + '/v1/leads/search_leadsource', {
				params: {
					q: this.state.lead_source,
					page: this.state.current_page,
					size: this.state.per_page
				}
			})
			.then(response => {
				this.setState({
					leads: response.data.leads,
					current_page: response.data.meta.current_page,
					total_count: response.data.meta.total_count
				})
			})
			.catch(err => this.handleError(err));
		});
	}


	render() {

		let self = this;
		let search_phone = $("#search_phone");

		var options = {
			getValue: "phone",
			url: function(phrase) {
				return url + "/v1/leads/search_phone?phone=" + phrase;
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
					self.setState({lead_id: lead_id})
					self.addByLeadID()
				}
			}
		}

		search_phone.easyAutocomplete(options);

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
					toastMessageFactory={Toast}
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
										<input ref={el => this.inputLeadID = el} className="form-control" onChange={this.handleChange} name="lead_id" type="text"   placeholder="2800097000000135253"/>
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
									<input onFocus={this.clearLeadSource} onChange={this.searchGlobal} className="form-control" name="search" type="text" placeholder="Person Name, Phone, or Company..."/>
								</div>

								<hr className="body-hr"/>

								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Filter by Lead Source</label>
									<input onFocus={this.clearSearch} onChange={this.searchLeadSource} className="form-control" name="lead_source" type="text" placeholder="Lead Source..."/>

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
									<tr className="info">
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
							<a className="btn btn-primary total-count">Records &nbsp;
								<span className="badge">{this.state.total_count}</span>
							</a>
							<div className="pagination-content pull-right">
								<Pagination
									activePage={this.state.current_page}
									itemsCountPerPage={this.state.per_page}
									totalItemsCount={this.state.total_count}
									pageRangeDisplayed={5}
									onChange={this.handlePageChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Lead;