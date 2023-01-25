// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

// anyone can forcefully send ether and break the game or manipulate it.
// we can prevent it by assuring that the ethers in contract are only counted if
// they are being sent by the deposit function, this way no one can send more than 1 ether.
// We have to define a variable named balance and update it only if someone
// sends ether only via deposit function.

contract EtherGame {
    uint public targetAmount = 7 ether;
    address public winner;

    //define balance here
    uint balance;

    function deposit() public payable {
        require(msg.value == 1 ether, "You can only send 1 Ether");
        //incrementing balance
        balance += msg.value;
        ///Not reading balance from contract balance///
        // uint balance = address(this).balance;
        require(balance <= targetAmount, "Game is over");

        if (balance == targetAmount) {
            winner = msg.sender;
        }
    }

    function claimReward() public {
        require(msg.sender == winner, "Not winner");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
}
