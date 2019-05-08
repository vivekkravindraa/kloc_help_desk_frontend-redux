import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/authActions';
import qs from 'query-string';
import '../../App.css';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmed: false
        }
    }

    componentDidMount() {
        let temporaryToken = qs.parse(this.props.location.search);
        this.props.verifyUser(temporaryToken.temp)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { isConfirmed } = this.props.auth;
        return (
            <div className="container" style={{textAlign:"center"}}>
            {
                isConfirmed ?
                (
                    <div
                        style={{ 
                        textAlign: "center",
                            visibility: this.state.isConfirmed ? 'visible' : 'hidden'}}
                        className="alert alert-success"
                        role="alert"
                    >
                    Email has been verified! <Link to="/login">Click here to Login.</Link>
                    </div>
                )
                :   null
            }
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
    { verifyUser }
)(withRouter(Confirmation))