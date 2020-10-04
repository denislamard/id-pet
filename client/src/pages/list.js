import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import {PhotoPopup} from '../components/modal';

const columnsInfo = [
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


class ListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            redirect: false,
            openModal: false,
            photo_hash: null,
            name: null,
            list: []
        }
        this.handleClose = this.handleClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.makeListPets();
    }

    handleClose(event) {
        this.setState({redirect: true});
    }

    getInfoPet = async (list, tokenId, contract, account) => {
        const data = await contract.methods.getPetInfo(account, tokenId).call({from: account});
        list.push({
            id: tokenId,
            name: data.name_pet,
            type: data.type_pet,
            color: data.color_pet,
            photo: <MDBBtn flat onClick={(e) => this.openModal(data.photo_hash, data.name_pet, e)}><img src={"https://ipfs.io/ipfs/".concat(data.photo_hash)} width="40px"
                                                                                                        alt={data.name_pet}/></MDBBtn>
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

    closeModal = (event) => {
        this.setState({openModal: false});
    }

    openModal = (urlPhoto, name, e) => {
        this.setState({openModal: true, photo_hash: urlPhoto, name: name});
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/'/>;
        }
        return (
            <Fragment>
                <MDBContainer>
                    <PhotoPopup isOpen={this.state.openModal} photo_hash={this.state.photo_hash} name={this.state.name} closeModal={this.closeModal}/>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon icon="list"/> List of pets</h2>
                    <MDBCard narrow>
                        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex align-items-center py-3 mx-4 mb-1">
                            Pets for {this.state.account}
                        </MDBCardHeader>
                        <MDBCardBody cascade>
                            {this.state.list.length === 0 &&
                            <div className={"text-center grey-text align-middle p-1"}>
                                <p style={{fontSize: "0.90em"}}>No pets already registered</p>
                            </div>
                            }
                            {this.state.list.length > 0 &&
                            <MDBTable btn fixed>
                                <MDBTableHead columns={columnsInfo}/>
                                <MDBTableBody rows={this.state.list}/>
                            </MDBTable>
                            }
                        </MDBCardBody>
                    </MDBCard>
                    <div className="text-right mt-2">
                        <MDBBtn outline color="grey" onClick={this.handleClose}>Back to the menu</MDBBtn>
                    </div>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ListPage;
