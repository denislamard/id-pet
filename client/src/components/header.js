import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBTooltip} from "mdbreact";

const Header = (props) => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="4">
                    <a href={"/"}><img src="assets/pets.png" className="pt-2" alt="logo" style={{width: '100%'}}/></a>
                    <MDBTooltip domElement tag="p"  placement="bottom">
                        <p className={"text-center indigo-text align-middle p-1"}
                           style={{fontSize: "0.80em", borderStyle: "solid", borderWidth: "thin", borderColor: "#bdbdbd"}}>
                            <a target="_blank" rel="noopener noreferrer" href={'https://goerli.etherscan.io/address/' + props.account}> <img src="assets/etherscan.png"
                                                                                                                                             alt="etherscan"
                                                                                                                                             style={{width: '16px'}}/> {props.account}
                            </a>
                        </p>
                        <span>Balance: <b>{props.balance}</b> ether</span>
                    </MDBTooltip>
                </MDBCol>
                <MDBCol md="8">
                    <h2 className="indigo-text text-center" style={{fontSize: "4em", fontWeight: "bolder"}}>ID-PET  D-APPLICATION</h2>
                    <p className="lead text-justify grey-text mt-4">This is a simple example of a decentralized
                        application based on unique non-fungible tokens on the Ethereum ERC721 blockchain.
                        Its main goal is to identify pets on the Ethereum blockchain.
                    </p>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="12">
                    <hr className="my-2"/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Header;