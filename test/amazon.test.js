const { expect } = require("chai");
const { ethers } = require("hardhat");

const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Amazon", () => {
  it("Has a name", async () => {
    const amazon = await ethers.getContractFactory("Amazon");
    const amazonContract = await amazon.deploy();
    const name = await amazonContract.name();
    expect(name).to.equal("Amazon");
  });
});
