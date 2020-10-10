import React from "react";
import {MDBCol, MDBContainer, MDBFooter, MDBRow, MDBIcon} from "mdbreact";

const Footer = (props) => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12">
                    <MDBFooter color="mdb-color darken-3" className="font-small pt-3 mt-5">
                        <MDBContainer fluid className="text-center text-md-left">
                            <MDBRow>
                                <MDBCol md="8">
                                    <h5 className="title"><MDBIcon icon="paw" /> Decentralized Application</h5>
                                    <hr className="my-1" style={{color:"white",backgroundColor:"white"}}/>
                                    <p className={"text-justify"} style={{color: "rgba(255,255,255,0.6)"}}>
                                        A decentralized application is a computer application that runs on a distributed computing system. DApps have been popularized by distributed ledger technologies (DLT) such as the Ethereum Blockchain, where DApps are often referred to as smart contracts.
                                    </p>
                                </MDBCol>
                                <MDBCol md="4" className={"text-center"}>
                                    <img src="assets/pets.png" className="pt-1" alt="logo" style={{width: '80%'}}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <div className="footer-copyright text-center py-2">
                            <MDBContainer fluid>
                                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Denis LAMARD </a> - Contract version: <strong>{props.version}</strong>
                            </MDBContainer>
                        </div>
                    </MDBFooter>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Footer;