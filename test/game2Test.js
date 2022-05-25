const { assert } = require("chai");

describe("Game2", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game2");
    const game = await Game.deploy();
    await game.deployed();

    // press all the right switches to win this stage
    let switchOnPromises = [20, 47, 212].map((value) => {
      return game.switchOn(value);
    });
    await Promise.all(switchOnPromises);

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
