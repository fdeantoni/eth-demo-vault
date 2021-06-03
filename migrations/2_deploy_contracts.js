var DemoVault = artifacts.require("DemoVault");

module.exports = function(deployer) {
  deployer.deploy(DemoVault);
};