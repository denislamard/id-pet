'use strict';
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const ContractABI = JSON.parse(fs.readFileSync("../src/contracts/Token.json"));


async function startApplication() {
    var instance = null;
    var accounts = null;

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ContractABI.networks[networkId];
    instance = new web3.eth.Contract(ContractABI.abi, deployedNetwork && deployedNetwork.address, {gas: "9721975"});
    accounts = await web3.eth.getAccounts();

    const owner = await instance.methods.owner().call();
    console.log('owner: ', owner);

    const totalSupply = await instance.methods.totalSupply().call({from: accounts[0]});
    console.log('totalSupply=', totalSupply);

    for (let i = 1; i <= totalSupply ; i++) {
        const data =  await instance.methods.getPetInfo(accounts[2], i).call({from: accounts[0]});
        console.log(i, data.name_pet, data.birthdate_pet);
    }

}

startApplication();
