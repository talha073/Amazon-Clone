// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Amazon {
    string public name;
    address owner;
    
    constructor(){
        name = "Amazon";
        owner = msg.sender;
    }
}