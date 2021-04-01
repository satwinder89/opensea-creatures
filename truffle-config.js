const HDWalletProvider = require("truffle-hdwallet-provider");

var configurationManager = require('./configurationManager');
var configuration = configurationManager.configuration;

// const MNEMONIC = process.env.MNEMONIC;
const MNEMONIC = configuration.MNEMONIC;

// const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const NODE_API_KEY = configuration.INFURA_KEY || configuration.ALCHEMY_KEY;

// const isInfura = !!process.env.INFURA_KEY;

const needsNodeAPI =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("live"));

if ((!MNEMONIC || !NODE_API_KEY) && needsNodeAPI) {
  console.error("MNEMONIC: " + MNEMONIC + "NODE_API_KEY");
  console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.");
  process.exit(0);
}

// const rinkebyNodeUrl = "https://rinkeby.infura.io/v3/bbb61069fead489e8c66b0eb5310047b"
const rinkebyNodeUrl = "https://rinkeby.infura.io/v3/" + NODE_API_KEY;

// isInfura
//   ? "https://rinkeby.infura.io/v3/" + NODE_API_KEY
//   : "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY;

const mainnetNodeUrl = "https://mainnet.infura.io/v3/" + NODE_API_KEY;

// isInfura
//   ? "https://mainnet.infura.io/v3/" + NODE_API_KEY
//   : "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY;


module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 500000000,
      network_id: "*", // Match any network id
      from: configuration.FROM
    },
    rinkeby: {
      provider: function () {
        try{
          return new HDWalletProvider(MNEMONIC, rinkebyNodeUrl);
        }catch(err){
          console.log(err);
        }
      },
      gas: 5000000,
      network_id: "*"
    },
    live: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(MNEMONIC, mainnetNodeUrl);
      },
      gas: 5000000,
      gasPrice: 5000000000,
    },
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 2,
    },
  },
  compilers: {
    solc: {
      version: "^0.5.0",
    },
  },
};
