import React from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBInput, MDBBadge} from "mdbreact";
import Token from "../contracts/Token.json";
import {BasePage} from "./base";

class ListTestPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        }
        //console.log(props);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }


    render() {
        console.log(this.props.match);
        console.log(this.state);
        return (
            <MDBContainer>
                <p>{this.state.tokenId}</p>
            </MDBContainer>
        );
    }

}

export default ListTestPage;