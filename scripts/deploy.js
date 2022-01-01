const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    // console.log("Deploying contracts with the account:", deployer.address);  
    // console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // const Token = await ethers.getContractFactory("Token");
    // const token = await Token.deploy();
  
    // console.log("Token address:", token.address);


    // const HelloWorld = await ethers.getContractFactory("HelloWorld");
    // const helloWorld = await HelloWorld.deploy();

    // console.log("HelloWorld:", (await helloWorld.sayHello()).toString());
    // console.log("Factorial:", (await helloWorld.getFactorial(3)).toString());
    // console.log("Calc:", (await helloWorld.calculate(3, '*', 4)).toString());

    
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();

    console.log("Donations address:", donation.address);
    // console.log("Donations address:", (await donation.gatherDonation()));
    console.log("Donations address:", (await donation.getMonyeboxValue()));
  


  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });