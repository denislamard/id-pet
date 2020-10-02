import React, {Fragment} from "react";
import {BasePage} from './base';
import {Redirect} from 'react-router'
import {
    MDBAlert,
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
    MDBSelectOptions,
    MDBTypography
} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";
import ValidationPopup from './modal';
import {validationData} from "../utils/validation";


/*

var tifs = {1: 'Joe', 2: 'Jane'};
...

return (
   <select id="tif" name="tif" onChange={this.handleChange}>
      { Object.entries(tifs).map((t,k) => <option key={k} value={t[0]}>{t[1]}</option>) }
   </select>
)

*/

const ErrorMessage = (props) => {
    const fields = props.fields;
    return (
        <div>
            {fields.length > 0 &&
            <MDBContainer className="mt-4">
                <MDBAlert color="danger">
                    <MDBTypography tag='h6' variant="h6">Submitting failed - {props.fields.length} field(s) must be corrected</MDBTypography>
                    {
                        fields.map((field) =>
                            <MDBRow>
                                <MDBCol size="1" className="ml-3">
                                    <MDBIcon icon="exclamation-triangle" className="red-text"/>
                                </MDBCol>
                                <MDBCol xl="10" size="11">
                                    <p className="red-text">{field}. Please complete this field</p>
                                </MDBCol>
                            </MDBRow>
                        )
                    }
                </MDBAlert>
            </MDBContainer>
            }
        </div>
    );
}

class CreatePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            redirect: false,
            openModal: false,
            errors: [],
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
            email: {required: true, type: 'email', msg: 'your email is required'},
            petname: {required: true, type: 'string', msg: 'Name of your pet is required'},
            petcolor: {required: true, type: 'string', msg: 'Color of your pet is required'},
            pettype: {required: true, type: 'string', msg: 'Kind of your pet is required'},
            petbirthdate: {required: true, type: 'date', msg: 'Birthdate of your pet is required'},
            photo_hash: {required: true, type: 'string', msg: 'Photo of your pet is required'},
            terms: {required: true, type: 'boolean', msg: 'Terms must be accepted'}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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

    }

    addToken = async () => {
        let self = this;
        const {account, contract} = this.state;

        contract.methods.addPet(account).send({from: account})
            .on('receipt', function (receipt) {
                self.setState({tokenId: receipt.events.AddToken.returnValues.id});
                //console.log(receipt.events.AddToken); //transactionHash
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
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }
        return (
            <Fragment>
                <ValidationPopup isOpen={this.state.openModal}
                                 closeModal={this.closeModal}
                                 callContract={this.addToken}
                                 name={this.state.petname}
                                 kindpet={this.state.pettype}
                                 color={this.state.petcolor}
                                 birthdate={this.state.petbirthdate}
                                 photo={this.state.photo_hash}/>
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
                                <MDBInput name="terms" getValue={this.handleTerms}
                                          label="I agreee to the terms and conditions" type="checkbox" id="checkbox"
                                          autoFocus={this.calculateAutofocus(1)}/>
                                <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2"/>
                                <div className="text-right mt-2">
                                    <MDBBtn outline color="grey">cancel</MDBBtn>
                                    <MDBBtn outline color="success" onClick={this.handleSubmit}>submit</MDBBtn>
                                </div>
                            </div>
                            <ErrorMessage fields={this.state.errors}/>
                        </div>
                    </form>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default CreatePage;