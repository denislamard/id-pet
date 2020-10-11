import React, {Fragment} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon} from "mdbreact";
import {Redirect} from 'react-router'
import {BasePage} from './base';

class NotFoundPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            redirect: false
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event) {
        this.setState({redirect: true});
    }


    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon icon="redo" /> Page not found</h2>
                    <div className="d-flex justify-content-center align-items-center" id="main" style={{height: "25vh"}}>
                        <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
                        <div className="inline-block align-middle">
                            <h2 className="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
                        </div>
                    </div>
                    <div className="text-right mt-2">
                        <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                    </div>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default NotFoundPage;