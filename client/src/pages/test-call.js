import React from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBInput, MDBBadge} from "mdbreact";
import Token from "../contracts/Token.json";
import {BasePage} from "./base";

class CallPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            tokenId: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
    listenAddToken = () => {
    /*
    listenAddToken = () => {
        let self = this;
        this.state.contract.events.AddToken().on("data", async function (evt) {

            if (evt.transactionHash !== self.state.transactionHash) {
                console.log("Token ID=", evt.returnValues.id);
                self.setState({transactionHash: evt.transactionHash, tokenId: evt.returnValues.id});
            }
        });
    }
    */

/*
{
    "logIndex": 1,
    "transactionIndex": 0,
    "transactionHash": "0x92bc599773932f68a181db0b9c676f9188d711bf59c7ef6020f8f2e19c7e6b42",
    "blockHash": "0x2d68a6bef01df08f051c9e1127b5a03c61e090d37c12d081e1cd6497910b1b26",
    "blockNumber": 148,
    "address": "0x27454DF0ef43C1825c2F597Ee6BfA4017DCFe329",
    "type": "mined",
    "id": "log_89df59b8",
    "returnValues": {
        "0": "41",
        "id": "41"
    },
    "event": "AddToken",
    "signature": "0x5bcb5fd4c92947f8a19c711dc5582f060ea564bec47e46cf4332095c3788cdac",
    "raw": {
        "data": "0x",
        "topics": [
            "0x5bcb5fd4c92947f8a19c711dc5582f060ea564bec47e46cf4332095c3788cdac",
            "0x0000000000000000000000000000000000000000000000000000000000000029"
        ]
    }
}

 */


    handleSubmit = async (event) => {
        event.preventDefault();
        let self = this;
        const {account, contract} = this.state;

        console.log(this.state);

        const data = {
            first_name: "Denis",
            last_name: "sdkljsdfj",
            email: "sdkljsdfj",
            name_pet: "sdkljsdfj",
            type_pet: "sdkljsdfj",
            color_pet: "dsfdsfkj",
            birthdate_pet: "sdkljsdfj",
            photo_hash: "sdkljsdfj"
        }



        contract.methods.addPet(account, data).send({from: account})
            .on('receipt', function (receipt) {
                self.setState({tokenId: receipt.events.AddToken.returnValues.id});
                const data = {
                    transactionHash: receipt.events.AddToken.transactionHash,
                    blockNumber:receipt.events.AddToken.blockNumber,
                    id: receipt.events.AddToken.returnValues.id
                }
                console.log(receipt); //.events.AddToken); //transactionHash
            });
    };

    handleData = async (event) => {
        event.preventDefault();
        let self = this;
        const {account, contract} = this.state;

        const data =  await contract.methods.getPetInfo(account, 2).call({from: account});
        console.log(data);
        alert(data.first_name);
    }

    render() {
        return (
            <MDBContainer>
                <p>{this.state.contract._address}</p>
                <MDBBtn onClick={this.handleSubmit}>call</MDBBtn>
                <MDBBtn onClick={this.handleData}>data</MDBBtn>
                <div>
                    {this.state.tokenId > 0 &&
                        <MDBBadge color="success">Token Id = {this.state.tokenId}</MDBBadge>
                    }
                </div>
            </MDBContainer>
        );
    }

}

export default CallPage;