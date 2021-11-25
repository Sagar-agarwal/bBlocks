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

		for (let i = 1; i < chain.length; i++) {
			let currentBlock = chain[i];
			let lastBlock = chain[i - 1];
			if (currentBlock.lastHash !== lastBlock.hash || currentBlock.hash !== Block.blockHash(currentBlock)) {
				return false;
			}
		}

		return answer;
	}

	replaceChain(newChain) {
		if (newChain.length <= this.chain.length) {
			console.log("The incoming chain must be longer.");
			return;
		} else if (!this.isValidChain(newChain)) {
			console.log("The incoming chain must be valid.");
			return;
		}

		console.log("Replacing blockchain with the new chain.");
		this.chain = newChain;
		this.lastBlock = this.chain[this.chain.length - 1];
		return;
	}
}

module.exports = Blockchain;
