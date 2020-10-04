import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

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
            list: []
        }
        this.handleClose = this.handleClose.bind(this);
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
            photo: <img src={"https://ipfs.io/ipfs/".concat(data.photo_hash)} width="35px" alt={data.name_pet}/>
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
        this.makeListPets();
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-5"><MDBIcon icon="list"/> List of pets</h2>
                    <MDBCard narrow>
                        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex align-items-center py-3 mx-4 mb-1">
                            Pets for {this.state.account}
                        </MDBCardHeader>
                        <MDBCardBody cascade>
                            <MDBTable btn fixed>
                                <MDBTableHead columns={columnsInfo}/>
                                <MDBTableBody rows={this.state.list}/>
                            </MDBTable>
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
