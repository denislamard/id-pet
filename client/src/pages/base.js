import React, {Component} from "react";
import {listPets} from "../utils/list";
import {MDBInput} from "mdbreact";

export class BasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {web3: props.web3, account: props.account, contract: props.contract, ipfs: props.ipfs};
    }

    loadData = async () => {
        let list = [];
        let pets = await listPets(this.state.contract, this.state.account);
        Object.keys(pets).forEach(item => {
            list.push({
                check: <MDBInput onChange={this.onChangeCheckbox} checked={false} name={"checkbox".concat(pets[item].id)} label=" " type="checkbox" id={pets[item].id}/>,
                id: pets[item].id,
                name: pets[item].name_pet,
                type: pets[item].type_pet,
                color: pets[item].color_pet,
                photo: <img src={"https://ipfs.io/ipfs/".concat(pets[item].photo_hash)} width="40px" alt={pets[item].name_pet}/>
            });
        });
        this.setState({list: list, wait: false});
    }
}
