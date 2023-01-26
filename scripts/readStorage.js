const { ethers } = require("hardhat");

let address;
async function main() {

  const Example = await hre.ethers.getContractFactory("Example");
  const example = await Example.deploy("ZartajAfser");

  await example.deployed();


  address = example.address;

  await example.addUser("password");
  await example.addUser("nopassword");
  await example.addUser("hellopassword");

  // Reading data from private array
  const index1user1 = await example.getArrayLocation(6, 0, 2);
  const index2user1 = await index1user1.add('1');

  const index1user2 = await example.getArrayLocation(6, 1, 2);
  const index2user2 = await index1user2.add('1');


  const index1user3 = await example.getArrayLocation(6, 2, 2);
  const index2user3 = await index1user3.add('1');

  //reading data from private mapping slot
  const mappingSlot = await example.getMapLocation(7,1); 



  //"0xB575a60AD828F9C16FF0A687e4358f97cbdf8346";

  
  const a = await ethers.provider.getStorageAt(address, 0);
  console.log(a);

  const b = await ethers.provider.getStorageAt(address, 1);
  console.log(b);

  const c = await ethers.provider.getStorageAt(address, 2);
  console.log(c);

  const e = await ethers.provider.getStorageAt(address, 6);
  console.log(e);

  const hexed1user1 = await ethers.utils.hexlify(ethers.BigNumber.from(index1user1));
  const hexed2user1 = await ethers.utils.hexlify(ethers.BigNumber.from(index2user1));
  const user1Id = await ethers.provider.getStorageAt(address, hexed1user1);
  const user1passsword = await ethers.provider.getStorageAt(address, hexed2user1);
  console.log(user1Id,user1passsword);


  const hexed1user2 = await ethers.utils.hexlify(ethers.BigNumber.from(index1user2));
  const hexed2user2 = await ethers.utils.hexlify(ethers.BigNumber.from(index2user2));
  const user2Id = await ethers.provider.getStorageAt(address, hexed1user2);
  const user2passsword = await ethers.provider.getStorageAt(address, hexed2user2);
  console.log(user2Id,user2passsword);

  const hexed1user3 = await ethers.utils.hexlify(ethers.BigNumber.from(index1user3));
  const hexed2user3 = await ethers.utils.hexlify(ethers.BigNumber.from(index2user3));
  const user3Id = await ethers.provider.getStorageAt(address, hexed1user3);
  const user3passsword = await ethers.provider.getStorageAt(address, hexed2user3);
  console.log(user3Id,user3passsword);

  //Private mapping

  const hexedMapSlot = await ethers.utils.hexlify(ethers.BigNumber.from(mappingSlot));
  const mapData = await ethers.provider.getStorageAt(address,hexedMapSlot)
  console.log(mapData);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function getShortStr() {




}

getShortStr(0);

