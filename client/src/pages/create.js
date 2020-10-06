import React, {Fragment} from "react";
import {BasePage} from './base';
import {Redirect} from 'react-router'
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBDatePicker,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOption,
    MDBSelectOptions
} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";
import ValidationPopup from '../components/modal';
import {validationData} from "../utils/validation";
import ErrorMessage from "../components/errors";
import dateFormat from 'dateformat'

class CreatePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            redirect: false,
            openModal: false,
            errors: [],
            transactionInfo : {
                transactionHash: null,
                blockNumber: null,
                id: null
            },
            firstname: null,
            lastname: null,
            email: null,
            petname: null,
            petcolor: null,
            pettype: null,
            petbirthdate: null,
            photo_hash: null,
            terms: 'false'
        }

        this.rules = {
            firstname: {required: true, type: 'string', msg: 'your firstname is required'},
            lastname: {required: true, type: 'string', msg: 'your lastname is required'},
            email: {required: true, type: 'email', msg: 'your email is required or is not valid'},
            petname: {required: true, type: 'string', msg: 'Name of your pet is required'},
            petcolor: {required: true, type: 'string', msg: 'Color of your pet is required'},
            pettype: {required: true, type: 'string', msg: 'Kind of your pet is required'},
            petbirthdate: {required: true, type: 'date', msg: 'Birthdate of your pet is required'},
            photo_hash: {required: true, type: 'string', msg: 'Photo of your pet is required'},
            terms: {required: true, type: 'boolean', msg: 'Terms must be accepted'}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handlePetBirthdate = this.handlePetBirthdate.bind(this);
        this.handleSelectPetType = this.handleSelectPetType.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleTerms = this.handleTerms.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const errors = validationData(this.rules, this.state);

        this.setState({errors: errors});
        this.setState({openModal: errors.length === 0 ? true : false});
        if (errors.length === 0) {
            this.addToken();
        }
    }

    handleClose(event) {
        this.setState({redirect: true});
    }

    InfoPet()  {
        return {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            name_pet: this.state.petname,
            type_pet: this.state.pettype,
            color_pet: this.state.petcolor,
            birthdate_pet: dateFormat(this.state.petbirthdate, "dd/mm/yyyy"),
            photo_hash: this.state.photo_hash
        }
    }

    addToken = async () => {
        let self = this;
        const {account, contract} = this.state;

        contract.methods.addPet(account, this.InfoPet()).send({from: account})
            .on('receipt', function (receipt) {
                self.setState({tokenId: receipt.events.AddToken.returnValues.id});
                const transactionInfo = {
                    transactionHash: receipt.events.AddToken.transactionHash,
                    blockNumber:receipt.events.AddToken.blockNumber,
                    id: receipt.events.AddToken.returnValues.id
                }
                self.setState({transactionInfo: transactionInfo});
            });
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSelectPetType = (value) => {
        this.setState({pettype: value[0]});
    }

    handlePetBirthdate = (value) => {
        this.setState({petbirthdate: value});
    }

    handleTerms = (value) => {
        this.setState({terms: value});
    }

    handlePhotoChange = (file) => {
        this.saveToIpfsWithFilename(file);
    }

    async saveToIpfsWithFilename(file) {
        try {
            const fileDetails = {path: file.name, content: file, added_file_hash: null}
            const added = await this.state.ipfs.add(fileDetails);
            this.setState({photo_hash: added.cid.toString()});
            console.log(added.cid.toString());
        } catch (err) {
            console.error(err)
        }
    }

    calculateAutofocus = (a) => {
        if (this.state['formActivePanel' + a + 'Changed']) {
            return true
        }
    }

    closeModal = () => {
        this.setState({openModal: false});
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }

        return (
            <Fragment>
                <ValidationPopup isOpen={this.state.openModal} closeModal={this.closeModal} data={this.InfoPet()} transactionInfo={this.state.transactionInfo}/>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon far icon="edit"/> Create an ID for
                        your pet</h2>
                    <form className="needs-validation">
                        <div className="indigo-text">
                            <h4 className="font-weight-bold grey-text"><MDBIcon icon="user"/> Some information about You
                            </h4>
                            <div className="px-4">
                                <div className={"create-div"}>
                                    <MDBInput name="firstname" onChange={this.handleChange} value={this.state.firstname}
                                              label="Your firstname" icon="user-edit"
                                              type="text"/>
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="lastname" onChange={this.handleChange} value={this.state.lastname}
                                              label="Your lastname" icon="user-edit" group type="text"/>
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="email" onChange={this.handleChange} value={this.state.email}
                                              label="Your email" icon="envelope" group type="email"/>
                                </div>
                            </div>
                            <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="paw"/> Information of your
                                well loved pet</h4>
                            <div className="px-4">
                                <div className={"create-div"}>
                                    <MDBInput name="petname" onChange={this.handleChange} value={this.state.petname}
                                              label="Name" icon="paw" group type="text"/>
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="petcolor" onChange={this.handleChange} value={this.state.petcolor}
                                              label="Color" icon="paw" group type="text"/>
                                </div>
                                <MDBContainer>
                                    <MDBRow middle>
                                        <MDBCol sm="8">
                                            <div className={"create-div"}>
                                                <MDBSelect label='Kind of pet' getValue={this.handleSelectPetType}>
                                                    <MDBSelectInput selected="aaa"/>
                                                    <MDBSelectOptions>
                                                        <MDBSelectOption disabled>Kind of your pet</MDBSelectOption>
                                                        <MDBSelectOption selected={this.state.pettype === 'cat'}
                                                                         value='cat' icon='assets/select-cat.jpg'>
                                                            Cat
                                                        </MDBSelectOption>
                                                        <MDBSelectOption selected={this.state.pettype === 'dog'}
                                                                         value='dog' icon='assets/select-dog.jpg'>
                                                            Dog
                                                        </MDBSelectOption>
                                                        <MDBSelectOption selected={this.state.pettype === 'rabbit'}
                                                                         value='rabbit' icon='assets/select-rabbit.jpg'>
                                                            Rabbit
                                                        </MDBSelectOption>
                                                        <MDBSelectOption selected={this.state.pettype === 'bird'}
                                                                         value='bird' icon='assets/select-bird.jpg'>
                                                            Bird
                                                        </MDBSelectOption>
                                                    </MDBSelectOptions>
                                                </MDBSelect>
                                            </div>
                                        </MDBCol>
                                        <MDBCol sm="4">
                                            <div className={"create-div text-center"}>
                                                <MDBDatePicker valueDefault={null} emptyLabel="Birthdate of your pet"
                                                               value={this.state.petbirthdate}
                                                               getValue={this.handlePetBirthdate}/>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </div>
                            <h4 className="font-weight-bold mt-5 mb-3 grey-text"><MDBIcon icon="camera"/> Add a Photo of
                                your pet</h4>
                            <div className={"px-4"}>
                                <MDBFileupload
                                    getValue={this.handlePhotoChange}
                                    ref={fileupload => this.fileupload = fileupload}
                                    maxFileSize="1M"
                                    allowedFileExtensions={['jpg', 'png', 'bmp']}
                                    containerHeight={600}
                                    maxHeight={1500}
                                    errorMaxHeight="Your photo must not have more than 500 pixels height"
                                    errorFileSize="The size of your photo is too big"
                                    errorFileExtension="The type of your photo is not allowed"
                                />
                            </div>
                            <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="check"/> Registration
                                completed!</h4>
                            <div className="px-4">
                                <p className="font-weight-bold mt-3 mb-1"><strong>Terms and conditions</strong></p>
                                <MDBInput name="terms" getValue={this.handleTerms}
                                          label="I agreee to the terms and conditions" type="checkbox" id="checkbox"
                                          autoFocus={this.calculateAutofocus(1)}/>
                                <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2"/>
                                <div className="text-right mt-2">
                                    <MDBBtn outline color="grey" onClick={this.handleClose}>cancel</MDBBtn>
                                    <MDBBtn outline color="success" onClick={this.handleSubmit}>submit</MDBBtn>
                                </div>
                            </div>
                            <ErrorMessage errors={this.state.errors}/>
                        </div>
                    </form>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default CreatePage;