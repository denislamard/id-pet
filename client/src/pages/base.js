import React, {Component} from "react";
import {listPets} from "../utils/list";
import {MDBInput, MDBBtn} from "mdbreact";
import {makeUrlPhoto} from '../utils/functions';


export class BasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {web3: props.web3, account: props.account, contract: props.contract, ipfs: props.ipfs};
    }

    loadData = async (viewType) => {
        let list = [];
        let pets = await listPets(this.state.contract, this.state.account);
        Object.keys(pets).forEach(item => {
            let pet = {}
            if (viewType===1) {
                pet = {
                    check: <MDBInput onChange={this.onChangeCheckbox} checked={false} name={"checkbox".concat(pets[item].id)} label=" " type="checkbox" id={pets[item].id}/>,
                    id: pets[item].id,
                    name: pets[item].name_pet,
                    type: pets[item].type_pet,
                    color: pets[item].color_pet,
                    photo: <img src={makeUrlPhoto(pets[item].photo_hash)} width="40px" alt={pets[item].name_pet}/>
                }
            } else {
                pet = {
                    id: pets[item].id,
                    name: pets[item].name_pet,
                    type: pets[item].type_pet,
                    color: pets[item].color_pet,
                    photo: <MDBBtn flat onClick={(e) => this.openModal(pets[item].photo_hash, pets[item].name_pet, e)}><img
                        src={makeUrlPhoto(pets[item].photo_hash)} width="40px"
                        alt={pets[item].name_pet}/></MDBBtn>,
                    url: makeUrlPhoto(pets[item].photo_hash)
                }
            }
            list.push(pet);
        });
        this.setState({list: list, wait: false});
    }
}
