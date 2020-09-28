import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MainPage from "./pages/main";
import CreatePage from "./pages/create";
import FindPage from "./pages/find";
import ListPage from "./pages/list";
import ChangePage from "./pages/change";
import NotFoundPage from "./pages/404";
import Header from './components/header';
import Footer from "./components/footer";
import {Title} from "./components/title";
import Test from "./pages/test";
import SignupForm from "./pages/test-formik";
import {getWeb3} from "./utils/web3";
import './App.css';
import {MDBCol, MDBContainer, MDBRow, MDBSpinner} from "mdbreact";
import ipfsClient from "ipfs-http-client";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {web3: null, account: null, ipfs: null};
    }

    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const ipfs = await ipfsClient('https://ipfs.infura.io:5001/api/v0/');
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        this.setState({
            web3: web3,
            account: accounts[0],
            balance: web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether'),
            ipfs: ipfs
        });
    }

    render() {
        if (!this.state.web3) {
            return (
                <Fragment>
                    <Title name={"PetID"} version={"1.0.0"}/>
                    <Header account={"not available yet"}/>
                    <MDBContainer className={"mt-5"}>
                        <MDBRow center>
                            <MDBCol md="4" className={"text-center"}>
                                <img src="assets/metamask.png" style={{width: '50%'}} alt={"Metamask"}/>
                            </MDBCol>
                            <MDBCol md="6" className={"text-center"}>
                                <h3>Loading data from Metamask...</h3>
                                <MDBSpinner className={"mt-4"} big/>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Title name={"PetID"} version={"1.0.0"}/>
                <Header account={this.state.account} balance={this.state.balance}/>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <MainPage web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="/create" exact>
                            <CreatePage web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="/find" exact>
                            <FindPage web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="/list" exact>
                            <ListPage web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="/change" exact>
                            <ChangePage web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="/test" exact>
                            <SignupForm web3={this.state.web3} account={this.state.account} ipfs={this.state.ipfs}/>
                        </Route>
                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                </Router>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
