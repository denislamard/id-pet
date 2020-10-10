
async function _getInfoPet(tokenId, contract, account) {
    return await contract.methods.getPetInfo(account, tokenId).call({from: account});
}

export async function listPets (contract, account) {
    let list = [];
    const owner = await contract.methods.owner().call();
    if (owner !== account) {
        const count = await contract.methods.balanceOf(account).call({from: account});
        for (let i = 0; i < count; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call({from: account});
            let data = await _getInfoPet(tokenId, contract, account);
            list.push(data);
        }
    } else {
        const tokens = await contract.methods.totalSupply().call({from: account});
        for (let token = 1; token <= tokens; token++) {
            let data = await _getInfoPet(token, contract, account);
            list.push(data);
        }
    }
    return list;
}
