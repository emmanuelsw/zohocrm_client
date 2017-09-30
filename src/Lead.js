import React, { Component } from 'react';
import reqwest from 'reqwest';

class Lead extends Component {

	constructor(props) {
		super(props);
		this.state = {
			leads: [],
			lead_id: 0,
			phone: 0,
			lead_source: 0
		};
	}

	componentDidMount() {

	}

  render() {
    return(
			<div className="container top-space">
				<div className="row">

					<div className="col-md-6 col-xs-12">
						<div className="well">
							<legend>Add Lead</legend>
							<hr className="title-hr"/>

							<form action="" method="post">
								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Add by Lead ID</label>
									<div className="input-group">
										<input className="form-control" id="lead_id" type="text" placeholder="2800097000000135253"/>
										<span className="input-group-btn">
											<button className="btn btn-default" type="button">Add!</button>
										</span>
									</div>
								</div>
							</form>

							<hr className="body-hr"/>

							<form action="" method="post">
								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Search by phone number</label>
									<input className="form-control" id="lead_id" type="text" placeholder="555-555-5555"/>
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
									<input className="form-control" id="lead" type="text" placeholder="Person Name, Phone, or Company..."/>
								</div>

								<hr className="body-hr"/>

								<div className="form-group">
									<label className="control-label" htmlFor="lead_id">Filter by Lead Source</label>
									<select value={this.state.value} className="form-control" id="select" onChange={(e)=>{this.setState({value: e.target.value})}}>
										<option disabled value="0">Select an option</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
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
									<tr>
										<td>Emmanuel Deossa</td>
										<td>IQ Think</td>
										<td>302-61-00</td>
										<td>313-745-9096</td>
										<td>Advertisement</td>
									</tr>
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