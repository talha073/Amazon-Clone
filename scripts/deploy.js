const hre = require("hardhat");
const token = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  [deployer] = await hre.ethers.getSigners();
  const Amazon = await ethers.getContractFactory("Amazon");
  const amazon = await Amazon.deploy();
  await amazon.deployed();
  console.log(`amazon contract at ${amazon.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
