async function main() {
  // We get the contract to deploy
  const Charity = await ethers.getContractFactory('Charity');
  console.log('Deploying Charity...');
  const charity = await Charity.deploy();
  await charity.deployed();
  console.log('Charity deployed to:', charity.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });