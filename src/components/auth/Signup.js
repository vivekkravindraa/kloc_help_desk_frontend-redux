import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authActions';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			isSubmitted: false
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleClick = (e) => {
		e.preventDefault();

		this.setState({ isSubmitted: true })
		const { firstName, lastName, email, password, confirmPassword } = this.state;

		const signupData = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		}

		// console.log(signupData);
		if (firstName && lastName && email && password && confirmPassword) {
			this.props.signupUser(signupData)
		}
	}

	render() {
		const { firstName, lastName, email, password, confirmPassword, isSubmitted } = this.state;

		return (
			<div className="col-md-6">
				<Link to="/" className="btn btn-link">Go To Home</Link>
				<h1>Signup</h1>
				<div className={'form-group' + (isSubmitted && !firstName ? ' has-error' : '')}>
					<label>First Name:</label>
					<input
						className="form-control"
						type="text"
						name="firstName"
						value={firstName}
						onChange={this.handleChange}
					/>
					{isSubmitted && !firstName &&
						<div className="help-block" style={{ color: "red" }}>First name is required</div>
					}
				</div>
				<div className={'form-group' + (isSubmitted && !lastName ? ' has-error' : '')}>
					<label>Last Name:</label>
					<input
						className="form-control"
						type="text"
						name="lastName"
						value={lastName}
						onChange={this.handleChange}
					/>
					{isSubmitted && !lastName &&
						<div className="help-block" style={{ color: "red" }}>Last name is required</div>
					}
				</div>
				<div className={'form-group' + (isSubmitted && !email ? ' has-error' : '')}>
					<label>Email:</label>
					<input
						className="form-control"
						type="email"
						name="email"
						value={email}
						onChange={this.handleChange}
					/>
					{isSubmitted && !email &&
						<div className="help-block" style={{ color: "red" }}>Email is required</div>
					}
				</div>
				<div className={'form-group' + (isSubmitted && !password ? ' has-error' : '')}>
					<label>Password:</label>
					<input
						className="form-control"
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
					/>
					{isSubmitted && !password &&
						<div className="help-block" style={{ color: "red" }}>Password is required</div>
					}
				</div>
				<div className={'form-group' + (isSubmitted && !confirmPassword ? ' has-error' : '')}>
					<label>Confirm Password:</label>
					<input
						className="form-control"
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
					/>
					{isSubmitted && !confirmPassword &&
						<div className="help-block" style={{ color: "red" }}>Confirm password is required</div>
					}
				</div>
				<div className="form-group">
					<button
						className="btn btn-secondary"
						type="submit"
						onClick={this.handleClick}
					>
						Signup
          			</button>
					<Link to="/login" className="btn btn-link">Login</Link>
				</div>
			</div>
		)
	}
}

export default connect(null, { signupUser })(Signup);