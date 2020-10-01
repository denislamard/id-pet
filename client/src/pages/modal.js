import React from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow, MDBSpinner} from 'mdbreact';

const ValidationPopup = (props) => {
    const birthdate = props.birthdate !== null ? props.birthdate.toLocaleString().substring(1, 10) : null;
    return (
        <MDBContainer>
            <MDBModal isOpen={props.isOpen}>
                <MDBModalHeader toggle={props.isOpen}>Waiting for registering your pet</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md="1">
                                <img
                                    src={"https://ipfs.io/ipfs/".concat(props.photo)}
                                    style={{width: "7em"}}/>
                            </MDBCol>
                            <MDBCol md="8" className="ml-auto">
                                <p className="py-0 my-1">Name: <strong>{props.name}</strong></p>
                                <p className="py-0  my-1">Type: <strong>{props.kindpet}</strong></p>
                                <p className="py-0  my-1">Birthdate :<strong>{birthdate}</strong></p>
                                <p className="py-0  my-1">Color: <strong>{props.color}</strong></p>

                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="text-center my-3">
                                    <MDBSpinner multicolor/>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={props.closeModal}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default ValidationPopup;