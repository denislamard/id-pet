import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import QrReader from 'react-qr-scanner'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardTitle} from "mdbreact";
import {listPets} from "../utils/list";
import ErrorMessage from "../components/errors";
import {validationData} from "../utils/validation";

const previewStyle = {
    height: "100%",
    width: "100%",
}

const columnsInfo = [
    {
        'label': 'Selected',
        'field': 'check',
        'sort': 'asc'
    },
    {
        'label': 'Unique ID',
        'field': 'id',
        'sort': 'asc'
    },
    {
        'label': 'Pet\'name',
        'field': 'name',
        'sort': 'asc'
    },
    {
        'label': 'kind of pet',
        'field': 'type',
        'sort': 'asc'
    },
    {
        'label': 'color',
        'field': 'color',
        'sort': 'asc'
    },
    {
        'label': 'Photo',
        'field': 'photo',
        'sort': 'asc'
    }
];

class ChangePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            wait: true,
            errors: [],
            list: [],
            selected: [],
            delay: 100,
            address: null,
            redirect: false
        }

        this.rules = {
            address: {required: true, type: 'string', msg: 'address of the new owner is required'},
            selected: {required: true, type: 'list', msg: 'at least one pet must be selected'}
        }

        this.handleClose = this.handleClose.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }

    componentDidMount() {
        let list = [];
        listPets(this.state.contract, this.state.account)
            .then((pets) => {
                Object.keys(pets).forEach(item => {
                    list.push({
                        check: <MDBInput onChange={this.onChangeCheckbox} name={"checkbox".concat(pets[item].id)} label=" " type="checkbox" id={pets[item].id}/>,
                        id: pets[item].id,
                        name: pets[item].name_pet,
                        type: pets[item].type_pet,
                        color: pets[item].color_pet,
                        photo: <img src={"https://ipfs.io/ipfs/".concat(pets[item].photo_hash)} width="40px" alt={pets[item].name_pet}/>
                    });
                });
                this.setState({list: list, wait: false});
            });
    }

    handleClose(event) {
        this.setState({redirect: true});
    }

    changePetOwner = async () => {
        let self = this;
        try {
            this.state.selected.forEach(async function (tokenId) {
                await self.state.contract.methods.safeTransferFrom(self.state.account, self.state.address, tokenId).send({from: self.state.account});
                window.location.reload(false);
            });
        } catch (err) {
            console.log(err);
            let errors = ["Failed to change the owner"];
            this.setState({errors: errors});
        }
    }

    applyChanges(event) {
        event.preventDefault();
        const errors = validationData(this.rules, this.state);
        if (errors.length === 0) {
            this.changePetOwner();
        } else {
            this.setState({errors: errors});
        }
    }

    handleChange(event) {
        //let addr = event.target.value;
        //console.log(this.state.web3.utils.isAddress(addr));
        this.setState({[event.target.name]: event.target.value});
    }

    handleScan(data) {
        //console.log(this.state.web3.utils.isAddress(data));
        this.setState({address: data});
    }

    handleError(err) {
        console.error(err)
    }

    onChangeCheckbox(event) {
        let list = this.state.selected;
        if (!event.target.checked) {
            list.splice(list.indexOf(event.target.id), 1);
        } else {
            list.push(event.target.id);
        }
        this.setState({selected: list});
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon icon="exchange-alt"/> Change a pet'owner</h2>
                    <h5 className="font-weight-bold grey-text"><MDBIcon icon="address-book"/> Address of the future owner</h5>
                    <MDBRow left className="ml-3">
                        <MDBCol size={8}>
                            <div className="indigo-text create-div">
                                <MDBInput name="address" onChange={this.handleChange} value={this.state.address} label="Type a valid address" icon="pen-fancy" group type="text"/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    {(this.state.address === null || this.state.address === "") &&
                    <Fragment>
                        <MDBRow center>
                            <MDBCol size={6}>
                                <MDBCard className="card-body mt-5">
                                    <MDBCardTitle className="text-center grey-text"><strong>Scan the QRCode</strong></MDBCardTitle>
                                    <QrReader
                                        delay={this.state.delay}
                                        style={previewStyle}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                    />
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </Fragment>
                    }
                    <div className="mt-5">
                        <h5 className="font-weight-bold grey-text"><MDBIcon icon="list"/> List of your pets</h5>
                        <MDBRow center className="ml-3 mt-3">
                            <MDBCol size={12}>
                                {this.state.wait === true
                                    ? <div className={"text-center align-middle"}><MDBSpinner className={"my-2"} big/></div>
                                    : <MDBTable btn fixed>
                                        {this.state.list.length === 0
                                            ? <div className={"text-center grey-text align-middle p-1 mt-4"}>
                                                <p style={{fontSize: "0.95em"}}>No pets already registered</p>
                                            </div>
                                            : <Fragment>
                                                <MDBTableHead columns={columnsInfo}/>
                                                < MDBTableBody rows={this.state.list}/>
                                            </Fragment>
                                        }
                                    </MDBTable>
                                }
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <MDBRow>
                        <MDBCol size={12}>
                            <div className="text-right mt-2">
                                <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                                <MDBBtn outline color="success" onClick={this.applyChanges}>Apply changes</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol sm="12" className="text-left">
                            <ErrorMessage errors={this.state.errors}/>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ChangePage;