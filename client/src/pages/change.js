import React, {Component, Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import QrReader from 'react-qr-scanner'
import {MDBBtn, MDBContainer, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBRow, MDBCol, MDBInput, MDBTable, MDBTableHead, MDBTableBody} from "mdbreact";

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
        this.makeListPets();
    }

    handleClose(event) {
        this.setState({redirect: true});
    }

    applyChanges(event) {
        alert('ok');
        console.log(this.state.list);
    }

    handleChange(event) {
        let addr = event.target.value;
        console.log(this.state.web3.utils.isAddress(addr));
        this.setState({[event.target.name]: event.target.value});
    }

    handleScan(data) {
        console.log(this.state.web3.utils.isAddress(data));
        this.setState({address: data});
    }

    handleError(err) {
        console.error(err)
    }

    getInfoPet = async (list, tokenId, contract, account) => {
        const data = await contract.methods.getPetInfo(account, tokenId).call({from: account});
        list.push({
            check: <MDBInput label=" " type="checkbox" id={"checkbox".concat(tokenId)} />,
            id: tokenId,
            name: data.name_pet,
            type: data.type_pet,
            color: data.color_pet,
            photo: <img src={"https://ipfs.io/ipfs/".concat(data.photo_hash)} width="40px" alt={data.name_pet}/>
        });
    }

    makeListPets = async () => {
        const contract = this.state.contract;
        const owner = await contract.methods.owner().call();
        const account = this.state.account;
        let list = [];

        if (owner !== this.state.account) {
            const count = await contract.methods.balanceOf(account).call({from: account});
            for (let i = 0; i < count; i++) {
                const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call({from: account});
                await this.getInfoPet(list, tokenId, contract, account);
            }
        } else {
            const tokens = await contract.methods.totalSupply().call({from: account});
            for (let token = 1; token <= tokens; token++) {
                await this.getInfoPet(list, token, contract, account);
            }
        }
        this.setState({list: list});
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
                    <MDBRow center className="mt-5">
                        <MDBCol size={6}>
                            <QrReader
                                delay={this.state.delay}
                                style={previewStyle}
                                onError={this.handleError}
                                onScan={this.handleScan}
                            />
                        </MDBCol>
                    </MDBRow>
                    }
                    {(this.state.address !== null && this.state.address !== "") &&
                    <div  className="mt-5">
                        <h5 className="font-weight-bold grey-text"><MDBIcon icon="list"/> List of your pets</h5>
                        <MDBRow center className="ml-3 mt-3">
                            <MDBCol size={12}>
                                <MDBTable btn fixed>
                                    <MDBTableHead columns={columnsInfo}/>
                                    <MDBTableBody rows={this.state.list}/>
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    }
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