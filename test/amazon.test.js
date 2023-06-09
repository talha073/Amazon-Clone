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
    it("emits list event", async () => {
      expect(transaction).to.emit(amazon, "List");
    });
  });
  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await amazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await amazon.connect(buyer).buy(ID, { value: COST });
    });
    it("update buyer's order count", async () => {
      const result = await amazon.orderCount(buyer.address);
      expect(result).to.equal(1);
    });
    it("Add's the order", async () => {
      const order = await amazon.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.be.equal(NAME);
      expect(order.item.category).to.be.equal(CATEGORY);
    });
    it("Should revert tx if the order id is not correct or 0", async () => {
      const order = await amazon.orders(buyer.address, 2);
      expect(order).to.be.revertedWith("out of stock");
    });
    it("update the contract balance", async () => {
      const result = await ethers.provider.getBalance(amazon.address);
      expect(result).to.equal(COST);
    });
    it("Emit buy event", async () => {
      expect(transaction).to.emit(amazon, "Buy");
    });
  });
});
