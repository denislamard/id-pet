import React, {Component, Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import QrReader from 'react-qr-scanner'
import {MDBBtn, MDBContainer, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter} from "mdbreact";

const previewStyle = {
    height: "100%",
    width: "100%",
}


class ModalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            delay: 100,
            address: null,
        }
        this.handleScan = this.handleScan.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleScan(data) {
        this.setState({
            address: data,
        })
    }

    handleError(err) {
        console.error(err)
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                        <QrReader
                            delay={this.state.delay}
                            style={previewStyle}
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />
                        
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

class ChangePage extends BasePage {

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
                <ModalPage></ModalPage>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon icon="exchange-alt"/> Change a pet'owner</h2>


                    <p>{this.state.address}</p>

                    <div className="text-right mt-2">
                        <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                    </div>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ChangePage;