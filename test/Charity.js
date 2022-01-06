const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require('@openzeppelin/test-helpers');


describe("Charity contract", function () {
    const value = '0.1';
    const etherValue = ethers.utils.parseEther(value);

    let Charity;
    let charity;
    let owner;
    let addr1;
    let addrs;

    this.beforeEach(async function () {
        Charity = await ethers.getContractFactory("Charity");
        [owner, addr1, ...addrs] = await ethers.getSigners();
        
        charity = await Charity.deploy();
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function () {
            expect(await charity.owner()).to.equal(owner.address);
        });

        it("Didn't should set donators", async function () {
            await expectRevert(
            charity.getAmountDonators(),
            "No donators.",
            );
        });

        it("Didn't should set donations", async function () {
            await expectRevert(
            charity.getAmountDonations(),
            "No donators.",
            );
        });
    });


    describe("Transactions", function () {
        it("makeDonation() should get donation", async function () {
            await charity.makeDonation({ value: etherValue });
            const balance = await charity.getAmountDonations();
            expect(balance).to.equal(etherValue);            
        });

        it("Donation should over 0 wei", async function () {
            await expectRevert(
            charity.makeDonation({value: ethers.utils.parseEther('0')}),
            "Transfer amount wei has to be greater than 0.",
            );
        });

        it("Non owner cannot call transferToBeneficiary", async function () {
            await expectRevert(
            charity.connect(addr1).transferToBeneficiary(addr1.address, {value: etherValue}),
            'Ownable: caller is not the owner',
            );
        });

        it("Should decrease amount donations", async function () {
            await charity.makeDonation({ value: etherValue })
            const balance = await charity.getAmountDonations();

            await charity.transferToBeneficiary(addr1.address, {value: etherValue});
            const balanceNew = await charity.getAmountDonations();

            expect(balance - etherValue).to.equal(balanceNew);            
        });
          
    });


    
    describe("Events", function () {
        it('makeDonation emits an event', async function () {
            const donation = await charity.makeDonation({ value: etherValue});

            // Test that a DonationMaked event was emitted with the new value
            await expect(donation).to.emit(charity, "DonationMaked")
            .withArgs(owner.address, etherValue);
        });

        it('WithdrawalMaked emits an event', async function () {
            await charity.makeDonation({ value: etherValue })
            const donation = await charity.transferToBeneficiary(addr1.address, { value: etherValue});

            // Test that a WithdrawalMaked event was emitted with the new value
            await expect(donation).to.emit(charity, "WithdrawalMaked")
            .withArgs(owner.address, addr1.address, etherValue);
        });
    });

    describe("Donator", function() {
        it("Add new Donator in array", async function () {
            const newDonator = await charity.makeDonation({value: etherValue});
            const donators = await charity.getAmountDonators();

            expect(donators).to.equal(1);
        });

        it("No donators", async function () {
            await expectRevert(
            charity.getDonationsSumOfDonator(owner.address),
            "No donators.",
            );
        });

        it("Donator not exist", async function () {
            await charity.makeDonation({value: etherValue});
            await expectRevert(
            charity.getDonationsSumOfDonator(addr1.address),
            "Donator not exist",
            );
        });

        it("Add new Donator in array", async function () {
            const newDonator = await charity.makeDonation({value: etherValue});
            const donators = await charity.getDonationsSumOfDonator(owner.address);

            expect(donators).to.equal(etherValue);
        });

    });
});