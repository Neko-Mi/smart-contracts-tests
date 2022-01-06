require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ALCHEMY_API_KEY = "17QNhVqTlXMYrnPBf8gFChe49bR9wHMI";

 const ROPSTEN_PRIVATE_KEY = "919642cac0c955eaf7117dfe7909040042c173c1233489b9610b5be10656d410";


module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
