const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC
const projectId = process.env.INFURA_PROJECT

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      networkCheckTimeout: 10000,
      provider: () => {
         return new HDWalletProvider(
           mnemonic,
           `wss://kovan.infura.io/ws/v3/${projectId}`
         );
      },
      network_id: "42",
   },
  },
  compilers: {
    solc: {
      version: "^0.8.4"
    }
  }
};
