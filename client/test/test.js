'use strict';
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const ContractABI = JSON.parse(fs.readFileSync("../src/contracts/Token.json"));


//const addr = '0x41ea202ebb3b30780CD27912923f460E5e6dCb03';
const addr = '0x7F26749432031137410608AC598836fC5e958439';

async function startApplication() {
    var instance = null;
    var accounts = null;

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ContractABI.networks[networkId];
    instance = new web3.eth.Contract(ContractABI.abi, deployedNetwork && deployedNetwork.address, {gas: "9721975"});
    accounts = await web3.eth.getAccounts();





    const owner = await instance.methods.owner().call();
    console.log('owner:\t', owner);
    console.log('sender:\t', addr);

    const totalSupply = await instance.methods.totalSupply().call({from: accounts[0]});
    console.log('all registered pets:', totalSupply);


    if (addr !== owner) {
        console.log('\nshow registered pets for:', addr);
        console.log('------------------------');

        const count = await instance.methods.balanceOf(addr).call({from: addr});
        console.log('Number of pets: ', count);

        let list = [];

        for (let i = 0; i < count; i++) {
            const tokenId = await instance.methods.tokenOfOwnerByIndex(addr, i).call({from: addr});
            const data = await instance.methods.getPetInfo(addr, tokenId).call({from: addr});
            list.push({
                id: tokenId,
                name: data.name_pet,
                type: data.type_pet,
                color: data.color_pet,
                photo: data.photo_hash
            });
        }
        console.log(list);
    } else {
        console.log('\nshow all registered pets');
        console.log('------------------------');

        for (let i = 1; i <= totalSupply ; i++) {
            const data =  await instance.methods.getPetInfo(addr, i).call({from: addr});
            console.log(i, data.name_pet, data.birthdate_pet);
        }
    }


}

/*

        {
            'id': '1',
            'name': 'Nettie',
            'type': 'Cat',
            'color': 'White',
            'photo': <a><img src="https://ipfs.io/ipfs/QmcTqTLryudDqWG8cJGBqozay9hpy2sdid3UVig6dQHXB6" width="35px"/></a>
        }

*/

startApplication();
