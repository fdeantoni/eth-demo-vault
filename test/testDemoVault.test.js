const truffleAssert = require('truffle-assertions');
const DemoVault = artifacts.require("DemoVault");

contract("DemoVault", (accounts) => {
    let vault;
    let owner = accounts[0];
    let example_key = "http://example.com";

    before(async () => {
        vault = await DemoVault.deployed();
    });

    describe("issuing a new key and checking validity", async () => {

        before("create key for account[1] using owner account", async () => {
          let result = await vault.add(example_key, accounts[1], { from: owner });
          truffleAssert.eventEmitted(result, 'NewKey', { url: example_key, holder: accounts[1] });
        });

        it("can check for valid key", async () => {
          const isValid = await vault.isValid(example_key);
          assert.isTrue(isValid, "The key should be valid!");
        });

        it("can invalidate a key", async () => {
          const result = await vault.invalidate(example_key);
          const isValid = await vault.isValid(example_key);
          assert.isFalse(isValid, "The key should not be valid anymore!");
        });

        it("unkonwn key should return invalid", async () => {
          const isValid = await vault.isValid("http://something_invalid.example.com");
          assert.isFalse(isValid, "The key should be invalid!");
        });

    });

    describe("purchasing a new key and check validity", async () => {

      let purchase_key = "http://other.example.org";

      before("purchase license by account[1]", async () => {
        let price = await vault.getPrice();
        let result = await vault.purchase(purchase_key, { from: accounts[1], value: price });
        truffleAssert.eventEmitted(result, 'NewKey', { url: purchase_key, holder: accounts[1] });
      });

      it("can check for valid key", async () => {
        const isValid = await vault.isValid(purchase_key);
        assert.isTrue(isValid, "The key should be valid!");
      });
  });



});