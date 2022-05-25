const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    let signers = await hre.ethers.getSigners();
    signers = signers.splice(0, 2);

    // nested mappings are rough :}
    await game.connect(signers[0]).write(signers[1].address);
    await game.connect(signers[1]).win(signers[0].address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
