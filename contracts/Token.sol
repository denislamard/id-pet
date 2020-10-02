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

    constructor(string memory baseURI)
        public
        ERC721("Unique Pet Id Tag", "UPIT")
    {
        _setBaseURI(baseURI);
    }

    function addPet(address owner, PetInfo memory info) public payable {
        _petIds.increment();
        uint256 Id = _petIds.current();
        _mint(owner, Id);
        _setTokenURI(Id, Id.toString());
        _list_pets[Id] = info;
        AddToken(Id);
    }


    function getPetInfo(address owner, uint256 id) public view returns (PetInfo memory info) {
        return _list_pets[id];
    }
}
