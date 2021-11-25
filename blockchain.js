const Block = require("./block");

class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
		this.lastBlock = this.chain[this.chain.length - 1];
	}

	addBlock(data) {
		const block = Block.mineBlock(this.lastBlock, data);
		this.chain.push(block);
		this.lastBlock = block;

		return block;
	}
}

module.exports = Blockchain;
