const { expect } = require("chai");
const { ethers } = require("hardhat");

const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Amazon", () => {
  let amazon;
  let deployer, buyer;
  beforeEach(async () => {
    //setup accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contracts
    const Amazon = await ethers.getContractFactory("Amazon");
    amazon = await Amazon.deploy();
  });
  describe("Development", () => {
    it("Sets the owner", async () => {
      expect(await amazon.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;
    beforeEach(async () => {
      transaction = await amazon
        .connect(deployer)
        .list(1, "Shoes", "Clothing", "IMAGE", 1, 4, 5);
      await transaction.wait();
    });
    it("Return item attributes", async () => {
      const item = await amazon.items(1);
      expect(item.id).to.equal(1);
    });
  });
});
