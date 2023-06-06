const { expect } = require("chai");
const { ethers } = require("hardhat");

const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE = "IMAGE";
const COST = token(1);
const RATING = 4;
const STOCK = 5;

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
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });
    it("Return item attributes", async () => {
      const item = await amazon.items(1);
      expect(item.id).to.equal(1);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });
  });
});
