import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';

class ModalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: props.isOpen
        };
    }

    close = () => {
        this.setState({modal: false});
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal}>
                    <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.close}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;