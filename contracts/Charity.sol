// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Charity is Ownable{

    address payable private administrator;
    uint private amountDonations;
  
    struct Donator {
        address addr;
        uint donationsSum;
        bool exist;
    }

    uint private numDonators;
    mapping(address => Donator) private donators;


    constructor () {
        administrator = payable (msg.sender);
    }


    event DonationMaked (
        address indexed _donator,
        uint _value
    );

    event WithdrawalMaked (
        address indexed _administrator,
        address indexed _beneficiary,
        uint _value
    );


    modifier validateTransferAmountWei() {
        require(msg.value > 0 wei, "Transfer amount wei has to be greater than 0.");
        _;
    }

    modifier validateDonatorsLength() {
        require(numDonators > 0, "No donators.");
        _;
    }

 
    function newDonator(address donator,  uint donationAmount) private {
        Donator storage d = donators[donator];

        if(!d.exist) {
            numDonators++;
            d.addr = donator;
            d.exist = true;
        }

        d.donationsSum += donationAmount;
    }

    function makeDonation() public validateTransferAmountWei() payable {
        administrator.transfer(msg.value);
        emit DonationMaked(msg.sender, msg.value);
        amountDonations += msg.value;
        newDonator(msg.sender, msg.value);           
    }
    
    function transferToBeneficiary(address payable beneficiary) public onlyOwner validateTransferAmountWei() payable {
        beneficiary.transfer(msg.value);
        emit WithdrawalMaked(msg.sender, beneficiary, msg.value);
        amountDonations -= msg.value;
    }

    function getAmountDonators() public view validateDonatorsLength() returns (uint) {
        return numDonators;
    }

    function getAmountDonations() public view validateDonatorsLength() returns (uint) {
        return amountDonations;
    }

    function getDonationsSumOfDonator(address donator) public view validateDonatorsLength() returns (uint) {
        require(donators[donator].exist, "Donator not exist");
        return donators[donator].donationsSum;
    }
}