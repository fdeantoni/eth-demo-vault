# Demo Vault #

This is a simple demo ethereum contract that allows the contract owner to store
IP addresses which they can then use to grant access to one of their applications
(see eth-demo-api).

The contract has the following functionality:
* Hold a 'vault' of keys
* Contract owner can add new keys
* Contract owner can invalidate keys
* Anyone else can purchse a key
* Base price of a key is USD 100
* Purchase price is Wei equivalent of base price at time of purchase

The Wei equivalent of the base price is calculated using the [Chainlink Oracle](https://data.chain.link/).

## Prerequisites ##

To use it, you will need to have MetaMask installed, and an infura.io project as
we will be using the Kovan testnet.

## Set Up Accounts ##

In your MetaMask wallet you will need two accounts. After installing you will
already have 1 account. Simply add another one via the UI. After creating this
account, send some eth (e.g. 0.5) to this second account.

## Configure ##

Create an `.env` file at the project root with the following:
```env
MNEMONIC="<your metamask recovery phrase>"
INFURA_PROJECT="<your infura project key for kovan network>"
```

Make sure to set `MNEMONIC` and `INFURA_PROJECT` appropriately.

## Upload Contracts to Kovan Testnet ##

Run the following in a terminal to upload the contract to Kovan Testnet:
```bash
$ truffle migrate --network kovan
```

If you made changes to the contrat after uploading, you can rerun the migrate
command as follows:
```bash
$ truffle migrate --reset --network kovan
```

## Interact with Contract ##

You can interact with the uploaded contract via the truffle console:
```bash
$ truffle console --network kovan
```

Once in the console, you can work with the contract as follows:
```js
// Get contract instance
let vault = await LicenseVault.deployed();
// Let contract owner (account[0]) add a new key for account[1]
await vault.add("192.168.1.1", accounts[1], { from: accounts[0] });
// Check if now valid
await vault.isValid("192.168.1.1");
// Retrieve the price (USD 100) in Wei using latest exchange rate
let price = await vault.getPrice();
// Purchuse the key using account[1] with latest price
await vault.purchase("127.0.0.1", { from: accounts[1], value: price });
// Check if now valid
await vault.isValid("127.0.0.1");
```
