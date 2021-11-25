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

		chain.forEach((block, index) => {
			if (index !== 0) {
				let lastBlock = chain[index - 1];
				if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
					return false;
				}
			}
		});

		return true;
	}
}

module.exports = Blockchain;
