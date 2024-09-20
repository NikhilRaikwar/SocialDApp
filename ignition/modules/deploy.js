const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("MetacircleModule", (m) => {
  const MetacircleContract = m.contract("Metacircle", []);
  return { MetacircleContract };
});
