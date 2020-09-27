import React, {Fragment} from "react";
import {BasePage} from './base';
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBIcon, MDBInput, MDBRow, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";

class CreatePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            formActivePanel1: 1,
            formActivePanel1Changed: false,
            firstname: null,
            lastname: null,
            email: null,
            petname: null,
            petcolor: null,
            pettype: null,
            petbirthdate: null,
            imageBuffer: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePetBirthdate = this.handlePetBirthdate.bind(this);
        this.handleSelectPetType = this.handleSelectPetType.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit() {
        console.log('*****************************');
        console.log(this.state);


        let data = new FormData();
        data.append('file', this.state.photo);
        console.log('submit', data)
        console.log('*****************************');




        alert('Form submitted!');
    }

    handleSelectPetType = (value) => {
        this.setState({pettype: value[0]});
    }

    handlePetBirthdate = (value) => {
        this.setState({petbirthdate: value});
    }

    handlePhotoChange = (file) => {
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        //reader.onloadend = () => this.convertToBuffer(reader);
        reader.onloadend = () => this.convertToBuffer(reader);
    }

    convertToBuffer = async (reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({
            imageBuffer: buffer
        });
    };


    /*
        captureFile = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async (reader) => {
        // file is converted to a imageBuffer to prepare for uploading to IPFS
        const myBuffer = await Buffer.from(reader.result);
        // set this imageBuffer -using es6 syntax
        this.setState({
            myToken: {
                ...this.state.myToken,
                imageBuffer: myBuffer
            }
        });
    };

     */

    calculateAutofocus = (a) => {
        if (this.state['formActivePanel' + a + 'Changed']) {
            return true
        }
    }


    render() {
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon far icon="edit"/> Create an ID for your pet</h2>
                    <div className="indigo-text">
                        <h4 className="font-weight-bold grey-text"><MDBIcon icon="user"/> Some information about You</h4>
                        <div className="px-4">
                            <div className={"create-div"}>
                                <MDBInput name="firstname" onChange={this.handleChange} value={this.state.firstname} label="Your firstname" icon="user-edit" group
                                          type="text" validate
                                          error="wrong"
                                          success="right"/>
                            </div>
                            <div className={"create-div"}>
                                <MDBInput name="lastname" onChange={this.handleChange} value={this.state.lastname} label="Your lastname" icon="user-edit" group
                                          type="text" validate
                                          error="wrong"
                                          success="right"/>
                            </div>
                            <div className={"create-div"}>
                                <MDBInput name="email" onChange={this.handleChange} value={this.state.email} label="Your email" icon="envelope" group type="email"
                                          validate
                                          error="wrong"
                                          success="right"/>
                            </div>
                        </div>
                        <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="paw"/> Information of your well loved pet</h4>
                        <div className="px-4">
                            <div className={"create-div"}>
                                <MDBInput name="petname" onChange={this.handleChange} value={this.state.petname} label="Name" icon="paw" group type="text" validate
                                          error="wrong"
                                          success="right"/>
                            </div>
                            <div className={"create-div"}>
                                <MDBInput name="petcolor" onChange={this.handleChange} value={this.state.petcolor} label="Color" icon="paw" group type="text"
                                          validate error="wrong"
                                          success="right"/>
                            </div>
                            <MDBContainer>
                                <MDBRow middle>
                                    <MDBCol sm="8">
                                        <div className={"create-div"}>
                                            <MDBSelect label='Kind of pet' getValue={this.handleSelectPetType}>
                                                <MDBSelectInput/>
                                                <MDBSelectOptions>
                                                    <MDBSelectOption disabled>Kind of your pet</MDBSelectOption>
                                                    <MDBSelectOption selected={this.state.pettype === 'cat'} value='cat' icon='assets/select-cat.jpg'>
                                                        Cat
                                                    </MDBSelectOption>
                                                    <MDBSelectOption selected={this.state.pettype === 'dog'} value='dog' icon='assets/select-dog.jpg'>
                                                        Dog
                                                    </MDBSelectOption>
                                                    <MDBSelectOption selected={this.state.pettype === 'rabbit'} value='rabbit' icon='assets/select-rabbit.jpg'>
                                                        Rabbit
                                                    </MDBSelectOption>
                                                    <MDBSelectOption selected={this.state.pettype === 'bird'} value='bird' icon='assets/select-bird.jpg'>
                                                        Bird
                                                    </MDBSelectOption>
                                                </MDBSelectOptions>
                                            </MDBSelect>
                                        </div>
                                    </MDBCol>
                                    <MDBCol sm="4">
                                        <div className={"create-div text-center"}>
                                            <MDBDatePicker valueDefault={null} emptyLabel="Birthdate of your pet" value={this.state.petbirthdate}
                                                           getValue={this.handlePetBirthdate}/>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                        <h4 className="font-weight-bold mt-5 mb-3 grey-text"><MDBIcon icon="camera"/> Add a Photo of your pet</h4>
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
                        <h4 className="font-weight-bold mt-5 grey-text"><MDBIcon icon="check"/> Registration completed!</h4>
                        <div className="px-4">
                            <p className="font-weight-bold mt-3 mb-1"><strong>Terms and conditions</strong></p>
                            <MDBInput label="I agreee to the terms and conditions" type="checkbox" id="checkbox" autoFocus={this.calculateAutofocus(1)}/>
                            <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2"/>
                            <div className="text-right mt-2">
                                <MDBBtn outline color="grey"
                                        onClick={this.handleSubmit}>cancel</MDBBtn>
                                <MDBBtn outline color="success"
                                        onClick={this.handleSubmit}>submit</MDBBtn>
                            </div>
                        </div>
                    </div>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default CreatePage;