require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ALCHEMY_API_KEY = "";

 const ROPSTEN_PRIVATE_KEY = "";


module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
