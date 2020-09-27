// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

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

contract Token is ERC721, Ownable {

    //using Utils for string;
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _petIds;

    
    constructor(string memory baseURI) public ERC721("Unique Pet Id Tag", "UPIT") {
        _setBaseURI(baseURI);
    }

    function addPet(address owner) public payable returns (uint256 Id) {
        _petIds.increment();
        Id = _petIds.current();
        _mint(owner, Id);
        _setTokenURI(Id, Id.toString());
        return Id;
    }



} 