const EternalStorage = artifacts.require("EternalStorage");

module.exports = function (deployer) {
  deployer.deploy(EternalStorage);
};