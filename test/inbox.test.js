const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
  // const provider = ganache.provider();
  // const web3 = new Web3(provider);
const initial_string='Hi There'
const { interface , bytecode } = require('../compile');

let accounts;
let inboxs;


beforeEach(async ()=>{
  //Get a list of all the accounts
    accounts = await web3.eth.getAccounts()

    //Use one of the accounts to deploy the contract
    inboxs = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data:bytecode,arguments:[initial_string]})
      .send({from:accounts[0],gas:'1000000'});
  //inbox.setProvider(provider);
});

describe('inbox',()=>{
  it('deploys a contract',()=>{
    assert.ok(inboxs.options.address);
  });

  it('has a default message',async ()=>{
    const message = await inboxs.methods.message().call();
    assert.equal(message,initial_string)
  });

  it('can change the message',async ()=>{
     await inboxs.methods.setMessage('byee').send({from:accounts[0]});
     const message = await inboxs.methods.message().call();
     assert.equal(message,'byee');
  });

});
