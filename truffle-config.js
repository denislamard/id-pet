const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    home: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1024",
      from: "0x41ea202ebb3b30780CD27912923f460E5e6dCb03",
      gas : 9721975
    },
    office: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1024",
      from: "0x1A8bC54e5867CA914Da36825CfFa042a6DA6d8Fb",
      gas : 6721975
    },
    testnet: {
      host: "https://goerli.infura.io/v3/a6e472f536264604adb0f997444aad93",
      network_id: "5",
      from: "0x41ea202ebb3b30780CD27912923f460E5e6dCb03",
      gas : 8000000
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider('e7af5f8730dfd2879d98e72cd78558e66efae2740cacc5f6c286b9ed7646b2de', 'https://goerli.infura.io/v3/a6e472f536264604adb0f997444aad93')
      },
      network_id: '5', 
      gas: 8000000,
      gasPrice: 10000000000,
    },    
  },
  compilers: {
    solc: {
      version: "0.6.8",
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  }
}
