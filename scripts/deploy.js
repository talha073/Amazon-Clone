const hre = require("hardhat");
const { items } = require("./items.json");
const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  [deployer] = await hre.ethers.getSigners();
  const Amazon = await ethers.getContractFactory("Amazon");
  const amazon = await Amazon.deploy();
  await amazon.deployed();
  console.log(`amazon contract at ${amazon.address}`);

  for (let i = 0; i < items.length; i++) {
    const tx = await amazon
      .connect(deployer)
      .list(
        items[i].id,
        items[i].name,
        items[i].category,
        items[i].image,
        token(items[i].price),
        items[i].rating,
        items[i].stock
      );
    await tx.wait();
    console.log(`Listed items ${items[i].id}: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
