import React, {Fragment} from "react";
import MDBFileupload from 'mdb-react-fileupload';
import {MDBBtn, MDBCol, MDBContainer, MDBDatePicker, MDBInput, MDBRow, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions, MDBStep, MDBStepper} from "mdbreact";
import {BasePage} from './base';

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
            photo: null,
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
        console.log('*****************************');
        alert('Form submitted!');
    }

    handlePetBirthdate = (value) => {
        this.setState({petbirthdate: value});
    }

    handleSelectPetType = (value) => {
        this.setState({pettype: value[0]});
    }


    swapFormActive = (a) => (param) => (e) => {
        this.setState({
            ['formActivePanel' + a]: param,
            ['formActivePanel' + a + 'Changed']: true
        });
    }

    handleNextPrevClick = (a) => (param) => (e) => {
        this.setState({
            ['formActivePanel' + a]: param,
            ['formActivePanel' + a + 'Changed']: true
        });
    }

    calculateAutofocus = (a) => {
        if (this.state['formActivePanel' + a + 'Changed']) {
            return true
        }
    }

    handlePhotoChange = (file) => {
        this.setState({
            photo: file
        })
    }

    handlePhotoChange1 = (file) => {
        let data = new FormData();
        data.append('file', this.state.file);
        this.setState({photo: data});
        console.log(this.state);
    }

    onSubmitHandler = e => {
        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.selectedFile);

        console.log('submit', data)

        this.fileupload.resetPreview();
    }


    render() {
        return (
            <Fragment>

                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold pt-2 pb-5 mb-2"><strong>Create an ID for
                        your pet</strong></h2>
                    <MDBStepper icon>
                        <MDBStep icon="user" stepName="Basic Information"
                                 onClick={this.swapFormActive(1)(1)}></MDBStep>
                        <MDBStep icon="cat" stepName="Personal Data"
                                 onClick={this.swapFormActive(1)(2)}></MDBStep>
                        <MDBStep icon="camera" stepName="Terms and Conditions"
                                 onClick={this.swapFormActive(1)(3)}></MDBStep>
                        <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(4)}></MDBStep>
                    </MDBStepper>

                    <form role="form" action="" method="post">

                        {this.state.formActivePanel1 === 1 &&
                        (<div>
                                <MDBRow center>
                                    <MDBCol md="11">
                                        <div className="indigo-text">
                                            <h3 className="font-weight-bold pl-0 my-4">Some information about You</h3>
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
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={"mt-4"}>
                                    <MDBCol md="12">
                                        <MDBBtn outline color="primary" className="float-right"
                                                onClick={this.handleNextPrevClick(1)(2)}>next</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        )}
                        {this.state.formActivePanel1 === 2 &&
                        (<div>
                                <MDBRow center>
                                    <MDBCol md="11">
                                        <div className="indigo-text">
                                            <h3 className="font-weight-bold pl-0 my-4">information of your well loved pet</h3>
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
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={"mt-4"}>
                                    <MDBCol md="12">
                                        <MDBBtn outline color="primary" className="float-left"
                                                onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
                                        <MDBBtn outline color="primary" className="float-right"
                                                onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        )}


                        {this.state.formActivePanel1 === 3 &&
                        (<div>
                                <MDBRow center>
                                    <MDBCol md="11">
                                        <div className="indigo-text">
                                            <h3 className="font-weight-bold pl-0 my-4">Add a Photo of your pet</h3>
                                        </div>
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
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={"mt-2"}>
                                    <MDBCol md="12">
                                        <MDBBtn outline color="primary" className="float-left"
                                                onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
                                        <MDBBtn outline color="primary" className="float-right"
                                                onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        )}

                        {this.state.formActivePanel1 === 4 &&
                        (<div>
                                <MDBRow center>
                                    <MDBCol md="11">
                                        <div className="indigo-text">
                                            <h3 className="font-weight-bold pl-0 my-4">Registration completed!</h3>
                                            <p className="font-weight-bold pl-0 mb-1"><strong>Terms and conditions</strong></p>
                                            <MDBInput label="I agreee to the terms and conditions" type="checkbox" id="checkbox" autoFocus={this.calculateAutofocus(1)}/>
                                            <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2"/>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={"mt-4"}>
                                    <MDBCol md="12">
                                        <MDBBtn outline color="primary" className="float-left"
                                                onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
                                        <MDBBtn outline color="success" className="float-right"
                                                onClick={this.handleSubmit}>submit</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        )}
                    </form>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default CreatePage;