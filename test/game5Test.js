const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    let signers = await hre.ethers.getSigners();
    const thresholdAddress = hre.ethers.BigNumber.from("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");

    let winningWallet;
    let winningAddressBN;
    do {
      winningWallet = new hre.ethers.Wallet.createRandom();
      winningAddressBN = hre.ethers.BigNumber.from(winningWallet.address);
    } while (thresholdAddress.lte(winningAddressBN));

    // Add provider to winning wallet
    winningWallet = winningWallet.connect(hre.ethers.provider);

    // Fund our winning wallet
    await signers[0].sendTransaction({ 
      to: winningWallet.address,
      value: hre.ethers.utils.parseEther('10')
    });

    await game.connect(winningWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
