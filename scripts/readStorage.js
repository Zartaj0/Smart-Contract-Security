
let address;
async function main() {

    const Example = await hre.ethers.getContractFactory("Example");
    const example = await Weak.deploy();

    await example.deployed();


    address = example.address;
}

async function getShortStr() {
    const a = await ethers.provider.getStorageAt(address, 0);
    console.log(a);
    const b = await ethers.provider.getStorageAt(address, 1);
    console.log(b);
    const c = await ethers.provider.getStorageAt(address, 2);
    console.log(c);
    const hexed = await ethers.utils.hexlify(ethers.BigNumber.from("111414077815863400510004064629973595961579173665589224203503662149373724986687"));
    // console.log("HEIHWEIWEHWIE",hexed);
    const d = await ethers.provider.getStorageAt(address, hexed);
    console.log(d);
    const e = await ethers.provider.getStorageAt(address, 4);
    console.log(e);
    const f = await ethers.provider.getStorageAt(address, 5);
    console.log(f);
    const g = await ethers.provider.getStorageAt(address, 6);
    console.log(g);





}

getShortStr(0);
