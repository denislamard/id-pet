import React, {Fragment} from "react";
import {BasePage} from './base';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

const data_panel = {
    columns: [
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

    ],
    rows: [
        {
            id: '1',
            name: 'Nettie',
            type: 'Cat',
            color: 'White',
            photo: <a><img src="https://ipfs.io/ipfs/QmcTqTLryudDqWG8cJGBqozay9hpy2sdid3UVig6dQHXB6" width="35px"/></a>
        }
    ]
};

class ListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            list: []
        }
    }

    makeListPets = async () => {
        const contract = this.state.contract;
        const owner = await contract.methods.owner().call();
        const account = this.state.account;
        let list = [];

        if (owner != this.state.account) {
            const count = await contract.methods.balanceOf(account).call({from: account});
            for (let i = 0; i < count; i++) {
                const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call({from: account});
                const data = await contract.methods.getPetInfo(account, tokenId).call({from: account});
                list.push({
                    id: tokenId,
                    name: data.name_pet,
                    type: data.type_pet,
                    color: data.color_pet,
                    photo: <a><img src={"https://ipfs.io/ipfs/".concat(data.photo_hash)} width="35px"/></a>
                });
            }
        } else {
            const totalSupply = await contract.methods.totalSupply().call({from: account});
            for (let i = 1; i <= totalSupply ; i++) {
                const data =  await contract.methods.getPetInfo(account, i).call({from: account});
                list.push({
                    id: i,
                    name: data.name_pet,
                    type: data.type_pet,
                    color: data.color_pet,
                    photo: <a><img src={"https://ipfs.io/ipfs/".concat(data.photo_hash)} width="35px"/></a>
                });
            }
        }
       this.setState({list: list});
    }

    render() {
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
                                <MDBTableHead columns={data_panel.columns}/>
                                <MDBTableBody rows={this.state.list}/>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ListPage;


/*
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

const TablePage = (props) => {
  const data_panel = {
    columns: [
      {
        'label': <MDBInput label=" " type="checkbox" id="checkbox5" />,
        'field': 'check',
        'sort': 'asc'
      },
      {
        'label': 'First Name',
        'field': 'first',
        'sort': 'asc'
      },
      {
        'label': 'Last Name',
        'field': 'last',
        'sort': 'asc'
      },
      {
        'label': 'Username',
        'field': 'username',
        'sort': 'asc'
      },
      {
        'label': 'Username',
        'field': 'username2',
        'sort': 'asc'
      },
      {
        'label': 'Username',
        'field': 'username3',
        'sort': 'asc'
      },
      {
        'label': 'Username',
        'field': 'username4',
        'sort': 'asc'
      }
    ],
    rows: [
      {
        'check': <MDBInput label=" " type="checkbox" id="checkbox6" />,
        'first': 'Mark',
        'last': 'Otto',
        'username': '@mdo',
        'username2': 'Mark',
        'username3': 'Otto',
        'username4': '@mdo'
      },
      {
        'check': <MDBInput label=" " type="checkbox" id="checkbox7" />,
        'first': 'Jacob',
        'last': 'Thornton',
        'username': '@fat',
        'username2': 'Jacob',
        'username3': 'Thornton',
        'username4': '@fat'
      },
      {
        'check': <MDBInput label=" " type="checkbox" id="checkbox8" />,
        'first': 'Larry',
        'last': 'the Bird',
        'username': '@twitter',
        'username2': 'Larry',
        'username3': 'the Bird',
        'username4': '@twitter'
      },
      {
        'check': <MDBInput label=" " type="checkbox" id="checkbox9" />,
        'first': 'Paul',
        'last': 'Topolski',
        'username': '@P_Topolski',
        'username2': 'Paul',
        'username3': 'Topolski',
        'username4': '@P_Topolski'
      },
      {
        'check': <MDBInput label=" " type="checkbox" id="checkbox10" />,
        'first': 'Larry',
        'last': 'the Bird',
        'username': '@twitter',
        'username2': 'Larry',
        'username3': 'the Bird',
        'username4': '@twitter'
      }
    ]
  };

  return(
    <MDBCard narrow>
      <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
        <div>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-th-large mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-columns mt-0"></i>
          </MDBBtn>
        </div>
        <a href="#" className="white-text mx-3">Table name</a>
        <div>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fas fa-pencil-alt mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fas fa-times mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-info-circle mt-0"></i>
          </MDBBtn>
        </div>
      </MDBCardHeader>
      <MDBCardBody cascade>
        <MDBTable btn fixed>
          <MDBTableHead columns={data_panel.columns} />
          <MDBTableBody rows={data_panel.rows} />
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default TablePage;
*/