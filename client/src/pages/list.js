import React, {Fragment} from "react";
import {Redirect} from 'react-router'
import {BasePage} from './base';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText
} from 'mdbreact';
import {PhotoPopup} from '../components/modal';

const ShowPetsAsRow = 1;
const ShowPetsAsCard = 2;

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

const ItemPet = (props) => {
    return (
        <MDBRow>
            <MDBCol sm="4">
                <span className="grey-text">{props.label}:</span>
            </MDBCol>
            <MDBCol sm="8">
                <strong>{props.value}</strong>
            </MDBCol>
        </MDBRow>
    );
}

const CardPet = (props) => {
    return (
        <MDBCard className="my-2">
            <MDBCardImage className="img-fluid hoverable" src={props.pet.url} zoom style={{width: "450px", height: "250px"}}/>
            <MDBCardBody>
                <MDBCardTitle className="indigo-text">{props.pet.name}</MDBCardTitle>
                <div style={{fontSize: "0.80em"}}>
                    <ItemPet label="Id" value={props.pet.id}/>
                    <ItemPet label="kind of pet" value={props.pet.type}/>
                    <ItemPet label="Color" value={props.pet.color}/>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}

const splitList = (array, length) =>
    array.reduce(
        (result, item, index) => {
            if (index % length === 0) result.push([])
            result[Math.floor(index / length)].push(item)
            return result
        },
        []
    )

const ShowPets = (props) => {
    if (props.showing === ShowPetsAsRow) {

        let listRows = [];
        props.list.map(item => (
            listRows.push({id: item.id, name: item.name, type: item.type, color: item.color, photo: item.photo})
        ));
        return (
            <MDBTable btn fixed>
                <MDBTableHead columns={columnsInfo}/>
                <MDBTableBody rows={listRows}/>
            </MDBTable>
        );
    } else {
        return (
            <MDBContainer fluid>
                {
                    splitList(props.list, 3).map(item => (
                        <MDBRow>
                            {
                                item.map(pet => (
                                    <MDBCol size="4"><CardPet pet={pet}/></MDBCol>
                                ))
                            }
                        </MDBRow>
                    ))
                }
            </MDBContainer>
        );
    }
}

class ListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            showing: ShowPetsAsRow,
            redirect: false,
            openModal: false,
            photo_hash: null,
            name: null,
            list: []
        }
        this.handleClose = this.handleClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showAsRow = this.showAsRow.bind(this);
        this.showAsCard = this.showAsCard.bind(this);
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
                                                                                                        alt={data.name_pet}/></MDBBtn>,
            url: "https://ipfs.io/ipfs/".concat(data.photo_hash),
        });
    }

    showAsRow = (event) => {
        this.setState({showing: ShowPetsAsRow});
    }

    showAsCard = (event) => {
        this.setState({showing: ShowPetsAsCard});
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
                        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                            <span>Pets for {this.state.account}</span>
                            <div>
                                <MDBBtn onClick={this.showAsCard} outline rounded size="sm" color="white" className="px-2">
                                    <i className="fa fa-th-large mt-0"></i>
                                </MDBBtn>
                                <MDBBtn onClick={this.showAsRow} outline rounded size="sm" color="white" className="px-2">
                                    <i className="fa fa-align-justify mt-0"></i>
                                </MDBBtn>
                            </div>
                        </MDBCardHeader>
                        <MDBCardBody cascade>
                            {this.state.list.length === 0 &&
                            <div className={"text-center grey-text align-middle p-1"}>
                                <p style={{fontSize: "0.90em"}}>No pets already registered</p>
                            </div>
                            }
                            {this.state.list.length > 0 &&
                            <ShowPets list={this.state.list} showing={this.state.showing}/>
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
