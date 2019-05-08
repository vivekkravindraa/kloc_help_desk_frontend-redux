import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <h4>
                    Good to see you, <b>{user.name[0].toUpperCase() + user.name.slice(1)}</b>
                </h4>
                <button
                    className="btn btn-secondary"
                    onClick={this.onLogoutClick}
                >
                    Logout
            </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
