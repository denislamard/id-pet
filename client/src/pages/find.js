import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBView, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle} from 'mdbreact';
import {BasePage} from './base';
import {validationData} from "../utils/validation";
import ErrorMessage from "../components/errors";


const ItemPet = (props) => {
    return (
        <MDBRow className="ml-2">
            <MDBCol sm="3">
                <span className="grey-text">{props.label}:</span>
            </MDBCol>
            <MDBCol sm="9">
                <strong>{props.value}</strong>
            </MDBCol>
        </MDBRow>
    );
}

const CardPet = (props) => {
    console.log(props);
    return (
        <MDBCard wide cascade>
            <MDBView cascade>
                <MDBCardImage
                    hover
                    overlay='white-slight'
                    className='card-img-top'
                    src={"https://ipfs.io/ipfs/".concat(props.infoPet.photo_hash)}
                    alt='Card cap'
                />
            </MDBView>
            <MDBCardBody cascade className='text-center mb-3'>
                <MDBCardTitle className='card-title indigo-text h2'>
                    <strong>{props.infoPet.name_pet}</strong>
                </MDBCardTitle>
                <div className="text-left mt-4">
                    <h5 className="indigo-text"><MDBIcon icon="user"/> You</h5>
                    <ItemPet label="Name" value={props.infoPet.first_name}/>
                    <ItemPet label="Email" value={props.infoPet.email}/>
                    <h5 className="indigo-text mt-4"><MDBIcon icon="cat"/> Your lovely pet</h5>
                    <ItemPet label="kind of pet" value={props.infoPet.type_pet}/>
                    <ItemPet label="Birthdate" value={props.infoPet.birthdate_pet}/>
                    <ItemPet label="Color" value={props.infoPet.color_pet}/>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}


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
        if (errors.length === 0) {
            this.getInfoPet();
        } else {
            this.setState({errors: errors});
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
                                <MDBInput name="findId" onChange={this.handleChange} value={this.state.findId} label="Type a valid ID" icon="pen-fancy" group type="text"/>
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
                                <MDBRow center>
                                    <MDBCol size="8">
                                        <CardPet infoPet={this.state.infoPet}/>
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
