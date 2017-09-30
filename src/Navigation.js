import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return(
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">

					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="">Zoho CRM Client</a>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li><a href="https://github.com/emmanuelsw/zohocrm_api">API Source Code</a></li>
							<li><a href="https://github.com/emmanuelsw/zohocrm_client">Client Source Code</a></li>
							<li><a href="https://github.com/emmanuelsw">Emmanuel Deossa</a></li>
						</ul>
					</div>

				</div>
			</nav>
		);
  }
}

export default Navigation;