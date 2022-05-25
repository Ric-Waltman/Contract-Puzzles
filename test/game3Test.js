const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await hre.ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    let signers = await hre.ethers.getSigners();
    signers = signers.splice(0, 3);

    const buyObjs = [
      { // addr 1
        signer: signers[0],
        value:  "2"
      },
      { // addr 2
        signer: signers[1],
        value:  "3"
      },
      { // addr 3
        signer: signers[2],
        value:  "1"
      }
    ];

    let buyPromises = buyObjs.map(elem => {
      return game.connect(elem.signer).buy({ value: elem.value });
    });
    await Promise.all(buyPromises);

    await game.win(buyObjs[0].signer.address, buyObjs[1].signer.address, buyObjs[2].signer.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
