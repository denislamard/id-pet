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

    handleSubmit = async (event) => {
        event.preventDefault();
        let self = this;
        const {account, contract} = this.state;

        contract.methods.addPet(account).send({from: account})
            .on('receipt', function (receipt) {
                self.setState({tokenId: receipt.events.AddToken.returnValues.id});
                //console.log(receipt.events.AddToken); //transactionHash
            });
    };

    render() {
        return (
            <MDBContainer>
                <p>{this.state.contract._address}</p>
                <MDBBtn onClick={this.handleSubmit}>call</MDBBtn>
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