import React from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow, MDBSpinner} from 'mdbreact';
import {makeUrlPhoto} from '../utils/functions';

export const ValidationPopup = (props) => {
    const birthdate = props.data.birthdate_pet !== null ? props.data.birthdate_pet.toLocaleString().substring(1, 10) : null;
    return (
        <MDBContainer>
            <MDBModal size="lg" isOpen={props.isOpen}>
                <MDBModalHeader toggle={props.isOpen}>Waiting for registering your pet</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md="1">
                                <img
                                    src={makeUrlPhoto(props.data.photo_hash)} //https://ipfs.io/ipfs/QmRTGppwz2kRBB6vwfnmpYcATNWPgCZH6wrbbU1ruFjiQT
                                    alt={"ipfs data store"}
                                    style={{width: "7em"}}/>
                            </MDBCol>
                            <MDBCol md="8" className="ml-auto">
                                <p className="py-0 my-1">Name: <strong>{props.data.name_pet}</strong></p>
                                <p className="py-0  my-1">Type: <strong>{props.data.type_pet}</strong></p>
                                <p className="py-0  my-1">Birthdate :<strong>{birthdate}</strong></p>
                                <p className="py-0  my-1">Color: <strong>{props.data.color_pet}</strong></p>

                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                {(props.transactionInfo.id === null && props.error === null) &&
                                <div className="text-center my-3"><MDBSpinner multicolor/></div>
                                }
                                {(props.transactionInfo.id !== null && props.error === null) &&
                                <MDBContainer fluid>
                                    <div className="text-left my-3 p-3 m-3" style={{fontSize: "0.85em", border: "solid 1px grey"}}>
                                        <p className="py-0 my-1">Transaction hash: <a target="_blank" rel="noopener noreferrer"
                                                                                      href={'https://goerli.etherscan.io/tx/' + props.transactionInfo.transactionHash}><strong>{props.transactionInfo.transactionHash}</strong></a>
                                        </p>
                                        <p className="py-0  my-1">Block number: <strong>{props.transactionInfo.blockNumber}</strong></p>
                                        <p className="py-0  my-1">Token ID :<strong>{props.transactionInfo.id}</strong></p>
                                    </div>
                                </MDBContainer>
                                }
                                {(props.transactionInfo.id === null && props.error !== null) &&
                                <div className="text-center my-3">
                                    <p className="text-danger">{props.error.message}</p>
                                </div>
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                {(props.transactionHash !== null || props.error !== null) &&
                <MDBModalFooter>
                    < MDBBtn outline color="success" onClick={props.closeModal}>Close</MDBBtn>
                </MDBModalFooter>
                }
            </MDBModal>
        </MDBContainer>
    );
}

export const PhotoPopup = (props) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={props.isOpen} side position="top-right">
                <MDBModalHeader toggle={props.isOpen}>{props.name}</MDBModalHeader>
                <MDBModalBody>
                    <div className="text-center">
                        <img
                            src={makeUrlPhoto(props.photo_hash)} //https://ipfs.io/ipfs/QmRTGppwz2kRBB6vwfnmpYcATNWPgCZH6wrbbU1ruFjiQT
                            alt={"ipfs data store"}
                            style={{width: "22em"}}/>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBContainer className="text-center">
                        <MDBBtn outline color="success" onClick={props.closeModal}>Close</MDBBtn>
                    </MDBContainer>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export const TransferPopup = (props) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={props.isOpen} centered>
                <MDBModalHeader toggle={props.isOpen}>Transfer ongoing</MDBModalHeader>
                <MDBModalBody>
                    <div className="text-center">
                        {(props.transactionHash === null && props.error === null) &&
                        <MDBSpinner multicolor/>
                        }
                        {(props.transactionHash !== null && props.error === null) &&
                        <p>The pet has been transferred with success</p>
                        }
                        {(props.transactionHash === null && props.error !== null) &&
                        <div className="text-center my-3">
                            <p className="text-danger">{props.error.message}</p>
                        </div>
                        }
                    </div>
                </MDBModalBody>
                {(props.transactionHash !== null || props.error !== null) &&
                <MDBModalFooter>
                    <MDBContainer className="text-center">
                        <MDBBtn outline color="success" onClick={props.closeModal}>Close</MDBBtn>
                    </MDBContainer>
                </MDBModalFooter>
                }
            </MDBModal>
        </MDBContainer>
    );
}
