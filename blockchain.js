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

	isValidChain(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}

		let answer = true;

		for (let i = 1; i < chain.length; i++) {
			let currentBlock = chain[i];
			let lastBlock = chain[i - 1];
			if (currentBlock.lastHash !== lastBlock.hash || currentBlock.hash !== Block.blockHash(currentBlock)) {
				return false;
			}
		}

		return answer;
	}
}

module.exports = Blockchain;
