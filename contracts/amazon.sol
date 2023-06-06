// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Amazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string catagory;
        string image;
        uint256 cont;
        uint256 rating;
        uint256 stock;
    }
    
    constructor(){
        owner = msg.sender;
    }

    function lsit(uint256 _id, string memory _name, string memory _catagory, string memory _image, uint256 _cost, uint256 _rating, uint256 _stock) public {
        
     }
}