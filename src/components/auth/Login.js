import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        const { email, password } = this.state;

        const loginData = {
            email,
            password
        }

        // console.log(loginData);

        if (email && password) {
            this.props.loginUser(loginData);
        }
    }

    render() {
        const { email, password, isSubmitted } = this.state;

        return (
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">Go To Home</Link>
                <h1>Login</h1>
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
                <div className={'from-group' + (isSubmitted && !password ? ' has-error' : '')}>
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
                <div className="form-group">
                    <button
                        className="btn btn-secondary"
                        type="submit"
                        onClick={this.handleClick}
                    >
                        Login
                    </button>
                    <Link to="/signup" className="btn btn-link">Signup</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { loginUser })(Login);
