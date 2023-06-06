const { expect } = require("chai");
const { ethers } = require("hardhat");

const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Amazon", () => {
  let amazon;
  beforeEach(async () => {
    //setup accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contracts
    const Amazon = await ethers.getContractFactory("Amazon");
    amazon = await Amazon.deploy();
  });
  describe("Development", () => {
    it("Has a name", async () => {
      const amazon = await ethers.getContractFactory("Amazon");
      const amazonContract = await amazon.deploy();
      const name = await amazonContract.name();
      expect(name).to.equal("Amazon");
    });
  });
});
