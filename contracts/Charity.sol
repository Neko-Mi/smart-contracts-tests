// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Charity {

    address payable owner;
    uint amountDonations;
  
    struct Donator {
        address addr;
        uint donationsSum;
        uint[] donations;
    }

    uint numDonators;
    mapping(address => Donator) donators;

    constructor () {
        owner = payable (msg.sender);
    }


    event Donation (
        address indexed _donator,
        uint _value
    );

    event Withdrawal (
        address indexed _owner,
        address indexed _beneficiary,
        uint _value
    );


    modifier restrictToOwner() {
        require(msg.sender == owner, "Only owner can call this.");
        _;
    }

    modifier validateTransferAmountWei() {
        require(msg.value > 0, "Transfer amount wei has to be greater than 0.");
        _;
    }

    modifier validateDonatorsLength() {
        require(numDonators > 0, "No donators");
        _;
    }

    
    function newDonator(address donator,  uint donationAmount) private {
        Donator storage d = donators[donator];

        if(d.addr != donator) {
            numDonators++;
            d.addr = donator;
        }
        
        d.donationsSum += donationAmount;
        d.donations.push(donationAmount);
        
        amountDonations += donationAmount;
    }

    function makeDonation() public validateTransferAmountWei() payable {
        newDonator(msg.sender, msg.value);
        emit Donation(msg.sender, msg.value);
        owner.transfer(msg.value);
    }
    
    function transferToBeneficiary(address payable beneficiary) public restrictToOwner() validateTransferAmountWei() payable {
        emit Withdrawal(msg.sender, beneficiary, msg.value);
        beneficiary.transfer(msg.value);
    }

    function getAmountDonators() public view validateDonatorsLength() returns (uint) {
        return numDonators;
    }

    function getAmountDonations() public view validateDonatorsLength() returns (uint) {
        return amountDonations;
    }
}