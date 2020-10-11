const token = artifacts.require("Token");

module.exports = function(deployer) {
  deployer.deploy(token, 'https://denislamard.github.io/id-pet/');
};
