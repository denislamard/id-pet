import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
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

class CreatePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            redirect: false,
            formActivePanel1: 1,
            formActivePanel1Changed: false,
            firstname: null,
            lastname: null,
            email: null,
            petname: null,
            petcolor: null,
            pettype: null,
            petbirthdate: null,
            photo_hash: null,
            terms: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePetBirthdate = this.handlePetBirthdate.bind(this);
        this.handleSelectPetType = this.handleSelectPetType.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleTerms = this.handleTerms.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(event.target);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({redirect: true});
    }

    handleSelectPetType = (value) => {
        console.log(value);
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


    render() {
        const {redirect} = this.state;

        /*
        if (redirect) {
            return <Redirect to='/somewhere'/>;
        }
        */

        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon far icon="edit"/> Create an ID for
                        your pet</h2>
                    <form className="needs-validation" onSubmit={this.handleSubmit}>
                        <div className="indigo-text">
                            <h4 className="font-weight-bold grey-text"><MDBIcon icon="user"/> Some information about You
                            </h4>
                            <div className="px-4">
                                <div className={"create-div"}>
                                    <MDBInput name="firstname" onChange={this.handleChange} value={this.state.firstname}
                                              label="Your firstname" icon="user-edit"
                                              type="text" required validate
                                    />
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="lastname" onChange={this.handleChange} value={this.state.lastname}
                                              label="Your lastname" icon="user-edit" group
                                              type="text" required validate
                                    />
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="email" onChange={this.handleChange} value={this.state.email}
                                              label="Your email" icon="envelope" group type="email"
                                              validate required
                                    />
                                </div>
                            </div>
                            <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="paw"/> Information of your
                                well loved pet</h4>
                            <div className="px-4">
                                <div className={"create-div"}>
                                    <MDBInput name="petname" onChange={this.handleChange} value={this.state.petname}
                                              label="Name" icon="paw" group type="text"
                                              required validate
                                    />
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="petcolor" onChange={this.handleChange} value={this.state.petcolor}
                                              label="Color" icon="paw" group type="text"
                                              required validate
                                    />
                                </div>
                                <MDBContainer>
                                    <MDBRow middle>
                                        <MDBCol sm="8">
                                            <div className={"create-div"}>
                                                <MDBSelect label='Kind of pet' getValue={this.handleSelectPetType} required validate>
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
                                    containerHeight={500}
                                    maxHeight={500}
                                    errorMaxHeight="Your photo must not have more than 500 pixels height"
                                    errorFileSize="The size of your photo is too big"
                                    errorFileExtension="The type of your photo is not allowed"
                                />
                            </div>
                            <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="check"/> Registration
                                completed!</h4>
                            <div className="px-4">
                                <p className="font-weight-bold mt-3 mb-1"><strong>Terms and conditions</strong></p>
                                <MDBInput name="terms" value={this.state.firstname} getValue={this.handleTerms}
                                          label="I agreee to the terms and conditions" type="checkbox" id="checkbox"
                                          autoFocus={this.calculateAutofocus(1)}/>
                                <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2"/>
                                <div className="text-right mt-2">
                                    <MDBBtn outline color="grey">cancel</MDBBtn>
                                    <MDBBtn outline color="success" type="submit">submit</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </form>
                </MDBContainer>
            </Fragment>
        )
    }
}

//disabled={this.state.photo_hash === null || this.state.terms === false}

export default CreatePage;