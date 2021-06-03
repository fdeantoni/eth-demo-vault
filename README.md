# Demo Vault #

This is a simple demo ethereum contract that allows the contract owner to store
IP addresses which they can then use to grant access to one of their applications
(see eth-demo-api). 

## Prerequisites ##

To use it, you will need to have MetaMask installed, and an infura.io project as
we will be using the Kovan testnet. 

## Set Up Accounts ##

In your MetaMask wallet you will need two accounts. After installing you will
already have 1 account. Simply add another one via the UI. After creating this
account, send some eth (e.g. 0.5) to this second account.

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
let vault = await LicenseVault.deployed();
let price = await vault.getPrice();
await vault.add("127.0.0.1", accounts[1], { from: accounts[0] });
await vault.isValid("127.0.0.1");
```


