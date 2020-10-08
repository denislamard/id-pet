// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/*
library Utils {
    function append(string memory a, string memory b) private pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

}
*/

struct PetInfo {
    uint256 id;
    string first_name;
    string last_name;
    string email;
    string name_pet;
    string type_pet;
    string color_pet;
    string birthdate_pet;
    string photo_hash;
}

contract Token is ERC721, Ownable {
    event AddToken(uint256 indexed id);

    //using Utils for string;
    using Counters for Counters.Counter;
    using Strings for uint256;

    mapping(uint256 => PetInfo) private _list_pets;

    Counters.Counter private _petIds;

    constructor(string memory baseURI) public ERC721("Unique Pet Id Tag", "UPIT")
    {
        _setBaseURI(baseURI);
    }

    function addPet(address PetOwner, PetInfo memory info) public payable {
        _petIds.increment();
        uint256 Id = _petIds.current();
        _mint(PetOwner, Id);
        _setTokenURI(Id, Id.toString());
	info.id = Id;
        _list_pets[Id] = info;
        AddToken(Id);
    }


    function getPetInfo(address PetOwner, uint256 id) public view returns (PetInfo memory info) {
        require(_exists(id), "token ID not exist");
        require(ownerOf(id) == PetOwner || msg.sender == owner(), 'the owner is not the given address');
        info = _list_pets[id];
        return info;
    }
}
