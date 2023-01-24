// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

/**
 *Two ways to prevent reentrancy
 * 1. Updating the balance before sending ether - line no. 32
 * 2. adding a modifier which sets the function locked until it is executed fully. 20
 *
 */

contract Weak {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

//reentrancy Guard modifier
    bool reent;
    modifier reentrancyGuard() {
        require(!reent,"paused");
        reent = true;
        _;
        reent =false;
    }

    function withdraw() external reentrancyGuard{
        require(balances[msg.sender] > 0, "no balance");

        // update the state variable of balance before the transfer.

        balances[msg.sender] = 0;

        (bool s, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(s, "tx failed");

        //balances[msg.sender] = 0;
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}

contract Attacker {
    Weak weak;

    constructor(Weak _weak) {
        weak = _weak;
    }

    fallback() external payable {
        if (address(weak).balance >= 1) {
            weak.withdraw();
        }
    }

    function attack() external payable {
        weak.deposit{value: 1 ether}();
        weak.withdraw();
    }

    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}
