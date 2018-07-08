---
title: Building Robust Smart Contracts with OpenZeppelin
date: 2018-06-14T03:21:27+08:00
authors: ["sumantabose"]
categories:
  - tutorials
tags:
  - ethereum
  - smart-contract
slug: robust-smart-contracts-openzeppelin
---

### Source
1. [http://truffleframework.com/tutorials/robust-smart-contracts-with-openzeppelin](http://truffleframework.com/tutorials/robust-smart-contracts-with-openzeppelin)
2. [https://openzeppelin.org/](https://openzeppelin.org/)
3. [http://truffleframework.com/tutorials/](http://truffleframework.com/tutorials/)

### Overview
This tutorial will cover:

1. Unboxing the front-end application
2. Creating the "TutorialToken" smart contract
3. Compiling and deploying the smart contract
4. Interacting with the new token
 
### Steps
1. Install Truffle.
```sh
$ npm install -g truffle
```
2. Install tutorialtoken truffle box in a directory `tutorial-token`. 
```sh
$ mkdir tutorial-token
$ cd tutorial-token
$ truffle unbox tutorialtoken
```
3. Next, we'll install OpenZeppelin. The most recent version of OpenZeppelin can be found as an npm package. 
```sh
npm install openzeppelin-solidity
```
4. Go to `/contracts` directory and create a new file `TutorialToken.sol` and save the following content.

```sh
pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract TutorialToken is StandardToken {
	string public name = 'TutorialToken';
	string public symbol = 'TT';
	uint8 public decimals = 2;
	uint public INITIAL_SUPPLY = 12000;

	constructor() public {
	  totalSupply_ = INITIAL_SUPPLY;
	  balances[msg.sender] = INITIAL_SUPPLY;
	}
}
```
5. In the `Migrations.sol` file in the `/contracts` directory, modify the **Old code** with the **New code**.
**Old code**
```sh
  function Migrations() public {
    owner = msg.sender;
  }
```
**New code**
```sh
  constructor() public {
    owner = msg.sender;
  }
```
6. Go back to the `tutorial-token` root directory `/` run the truffle development console.
```sh
truffle develop
```
7. Compile the smart contracts. Note inside the development console we don't need to preface commands with `truffle`.
```sh
compile
```
You should see output similar to the following:
```sh
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/TutorialToken.sol...
Compiling openzeppelin-solidity/contracts/math/SafeMath.sol...
Compiling openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol...
Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20.sol...
Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol...
Compiling openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol...
Writing artifacts to ./build/contracts
```
7. Now that we've successfully compiled our contracts, it's time to **migrate** them to the blockchain! To know about migration read the [migration documentation](http://truffleframework.com/docs/getting_started/migrations). You will see one JavaScript file already in the `migrations/` directory: `1_initial_migration.js`. This handles deploying the `Migrations.sol` contract. Now we are ready to create our own migration script.
- Create a new file named `2_deploy_contracts.js` in the `migrations/ directory`.
- Add the following content to the `2_deploy_contracts.js` file:
```sh
var TutorialToken = artifacts.require("TutorialToken");

module.exports = function(deployer) {
	deployer.deploy(TutorialToken);
};
```
- Before we can migrate our contract to the blockchain, we need to have a blockchain running. For this tutorial, we're going to use [Ganache](http://truffleframework.com/ganache), a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests. If you haven't already, [download Ganache](http://truffleframework.com/ganache) and double click the icon to launch the application. This will generate a blockchain running locally on port **7545**. Read the ganache documentation [here](http://truffleframework.com/docs/ganache/using).

8. As contracts are already compiled. deploy them to the blockchain
```sh
migrate
```
You will see the output similar to this
```sh
Using network 'development'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xef3256421a3f6df717ac9260686a51d7086eced61a45d000c9a90cf8cdf0877d
  Migrations: 0xa9071f414b5b7bd5104e51062fcdb25d7228dc42
Saving successful migration to network...
  ... 0xaeb2d591faaa9e18cf1a0dab666910e9cb72d0fa3f1c6e2298be46f653a36236
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing TutorialToken...
  ... 0x774162740b7b8ee6b8fbbbeda1ef9887b82fd094a2d3b2b507ea831d552ef1e0
  TutorialToken: 0x742ba4ca4a5fda24334f04347f412d7d7566a353
Saving successful migration to network...
  ... 0xbf03e82413a5f1c28b182cc3af7dead1d17bd437b7238b53102207aa385df981
Saving artifacts...
```
Ganache will also list these transactions as well.
9. ##### Interacting with the new token
For this portion of the tutorial, we recommend using MetaMask, a browser extension for Chrome and Firefox. It will allow you to switch between accounts quickly, perfect for testing the ability to transfer our newly created tokens. Our Pet Shop tutorial has more information about configuring MetaMask.
Still in your terminal, run a local web server containing the front-end application:
```sh
npm run dev
```
- A browser window will show you the TutorialToken Wallet with an initial balance of 12000.
- To transfer some TutorialToken tokens to a different account, choose an account from the Ganache accounts (10 Listed Accounts). Pick one of the other accounts (we recommend the second account) and enter it in the "Address" box, and also enter 2000 (Any amount <= 12000) in the "Amount" field.
- To check whether you have sucessfully transferred the amount, refresh the webpage. You will see the balance as 10000. (As you were in Account 1 of MetaMask)
- If you create new Account in MetaMask, your Account 2 (Address) will be same as Account 2 of your Ganache (Same for Account 1). Now switch to Account 2 in MetaMask (and Refresh the weboage) and you see that the balance shows as 2000 which you transferred from Account 1 in previous step.

##### Congratulations!! You have created new Tokens.

