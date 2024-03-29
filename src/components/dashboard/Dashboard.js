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
                <button
                    className="btn btn-secondary"
                    onClick={this.onLogoutClick}
                >
                    Logout
                </button>
                <h4>
                    Good to see you,
                    <b>
                        {user.name[0].toUpperCase() + user.name.slice(1)}
                    </b>
                </h4>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
