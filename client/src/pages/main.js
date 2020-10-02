import React, {Fragment} from 'react';
import {BasePage} from './base';
import {useHistory} from "react-router-dom";
import {MDBBtn, MDBCard, MDBLink, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow} from "mdbreact";

function CardMenu(props) {
    let history = useHistory();

    function handleClick() {
        history.push(props.url);
    }

    return (
        <MDBCard>
            <MDBLink to='#' onClick={handleClick} link>
                <MDBCardImage
                    top
                    src={props.image}
                    overlay='white-slight'
                    hover
                    alt='MDBCard image cap'
                />
            </MDBLink>
            <MDBCardBody>
                <div className={"text-center"}>
                    <MDBBtn color="primary" onClick={handleClick} outline>{props.action}</MDBBtn>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}

class MainPage extends BasePage {

    render() {
        return (
            <Fragment>
                <MDBContainer className={"my-4"}>
                    <MDBRow center>
                        <MDBCol sm="4">
                            <CardMenu action={"Create An ID"} image={"assets/m1.jpeg"} url={"/create"}/>
                        </MDBCol>
                        <MDBCol sm="4">
                            <CardMenu action={"Find a pet"} image={"assets/find-pet.jpg"} url={"/find"}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center className={"mt-4"}>
                        <MDBCol sm="4">
                            <CardMenu action={"List all Ids"} image={"assets/m3.jpg"} url={"/list"}/>
                        </MDBCol>
                        <MDBCol sm="4">
                            <CardMenu action={"Change owner"} image={"assets/m4.jpg"} url={"/change"}/>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default MainPage;