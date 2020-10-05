import React, {Fragment} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from 'mdbreact';
import {BasePage} from './base';

class FindPage extends BasePage {

    render() {
        return (
            <Fragment>
                <MDBContainer>
                    <h2 className="indigo-text font-weight-bold mt-2 mb-2"><MDBIcon icon="search"/> Find a pet</h2>
                    <MDBRow center>
                        <MDBCol sm="6">
                            <div className={"create-div"}>
                                <MDBInput label="Type a valid ID" icon="user" group type="text"/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center>
                        <MDBCol sm="6" className="text-right">
                            <MDBBtn outline color="success" onClick={this.handleClose}>Find</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default FindPage;