import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import QrReader from 'react-qr-scanner'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {listPets} from "../utils/list";

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
            list: [],
            delay: 100,
            address: null,
            redirect: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

    componentDidMount() {
        let list = [];
        listPets(this.state.contract, this.state.account)
            .then((pets) => {
                Object.keys(pets).forEach(item => {
                    list.push({
                        check: <MDBInput onChange={this.onChangeCheckbox.bind(this)} name={"checkbox".concat(pets[item].id)} label=" " type="checkbox" id={pets[item].id}/>,
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

    applyChanges(event) {
        alert('ok');
        console.log(this.state.list[0].check.checked);
        console.log('address: ', this.state.address);
    }

    handleChange(event) {
        let addr = event.target.value;
        console.log(this.state.web3.utils.isAddress(addr));
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
        console.log(event.target.id, event.target.checked);
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
                        <MDBRow center className="mt-3">
                            <MDBCol size={6}>
                                <p className="text-center grey-text"><strong>Scan your address</strong></p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow center>
                            <MDBCol size={6}>
                                <QrReader
                                    delay={this.state.delay}
                                    style={previewStyle}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                />
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

                    <div className="text-right mt-2">
                        <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                        <MDBBtn outline color="success" onClick={this.applyChanges}>Apply changes</MDBBtn>
                    </div>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ChangePage;