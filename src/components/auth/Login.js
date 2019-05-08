import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
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

        const userData = {
            email,
            password
        }

        // console.log(loginData);

        if (email && password) {
            this.props.loginUser(userData);
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));