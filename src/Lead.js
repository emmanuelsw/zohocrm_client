import React, { Component } from 'react';

class Lead extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '0'
		};
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
			</div>
		);
  }
}

export default Lead;