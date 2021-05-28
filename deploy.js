const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface,bytecode}= require('./compile');
const mneumonic="sock casual expose receive crush ski forget twenty essence echo base hint"

const provider = new HDWalletProvider(
  mneumonic,
  "https://rinkeby.infura.io/v3/fcda74d553b841a392f8f6244c6c19b4"
);
const web3 = new Web3(provider);

const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from the account',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:'0x'+bytecode,arguments:['First message!']})
    .send({gas:'1000000',from:accounts[0]});

    result.setProvider(provider);
  console.log('contract deployed at',result.options.address );
};
deploy();

// Attempting to deploy from the account 0xB558ceC5bE5dd67846ae26a0F2c6faf3569214fd
// contract deployed at 0x1DdDe2c545CF9C1E3588d25544748cc4577aD995
