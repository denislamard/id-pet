import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBView} from 'mdbreact';
import {BasePage} from './base';
import {validationData} from "../utils/validation";
import ErrorMessage from "../components/errors";
import dateFormat from "dateformat";


class FindPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            errors: [],
            findId: null,
            infoPet: null,
            redirect: false
        }

        this.rules = {
            findId: {required: true, type: 'string', msg: 'unique ID is required'}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFind = this.handleFind.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClose(event) {
        this.setState({redirect: true});
    }

    handleFind(event) {
        event.preventDefault();
        this.setState({infoPet: null});
        const errors = validationData(this.rules, this.state);
        this.setState({errors: errors});
        if (errors.length === 0) {
            this.getInfoPet();
        }
    }

    getInfoPet = async () => {
        try {
            const infoPet = await this.state.contract.methods.getPetInfo(this.state.account, this.state.findId).call({from: this.state.account});
            this.setState({infoPet: infoPet});
        } catch (err) {
            let errors = ["Failed to get data"];
            this.setState({errors: errors});
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-2"><MDBIcon icon="search"/> Find a pet</h2>
                    <MDBRow center>
                        <MDBCol sm="6">
                            <div className="indigo-text create-div">
                                <MDBInput name="findId" onChange={this.handleChange} value={this.state.findId} label="Type a valid ID" icon="user-edit" group type="text"/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol sm="6" className="text-right">
                            <MDBBtn outline color="success" onClick={this.handleFind}>Find</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol sm="12" className="text-left">
                            <ErrorMessage errors={this.state.errors}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" className="mt-5">
                            {this.state.infoPet !== null &&
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <div className="text-center">
                                            <img src={"https://ipfs.io/ipfs/".concat(this.state.infoPet.photo_hash)} style={{width: "200px"}} alt="" className="img-fluid"/>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <h5 className="indigo-text"><MDBIcon icon="user"/> You</h5>
                                        <MDBRow className="ml-2">
                                            <MDBCol sm="2">
                                                <span className="grey-text">name:</span>
                                            </MDBCol>
                                            <MDBCol sm="10">
                                                <strong>{this.state.infoPet.first_name} {this.state.infoPet.last_name}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="ml-2">
                                            <MDBCol sm="2">
                                                <span className="grey-text">email:</span>
                                            </MDBCol>
                                            <MDBCol sm="10">
                                                <strong>{this.state.infoPet.email}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                        <h5 className="indigo-text mt-4"><MDBIcon icon="cat"/> Your lovely pet</h5>
                                        <MDBRow className="ml-2">
                                            <MDBCol sm="2">
                                                <span className="grey-text">kind of pet:</span>
                                            </MDBCol>
                                            <MDBCol sm="10">
                                                <strong>{this.state.infoPet.type_pet}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="ml-2">
                                            <MDBCol sm="2">
                                                <span className="grey-text">Birthdate:</span>
                                            </MDBCol>
                                            <MDBCol sm="10">
                                                <strong>{this.state.infoPet.birthdate_pet}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="ml-2">
                                            <MDBCol sm="2">
                                                <span className="grey-text">Color:</span>
                                            </MDBCol>
                                            <MDBCol sm="10">
                                                <strong>{this.state.infoPet.color_pet}</strong>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                            }
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="12" className="mt-4 text-right">
                            <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default FindPage;
