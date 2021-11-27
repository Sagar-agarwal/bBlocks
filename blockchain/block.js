const ChainUtil = require("../utils/chain-util");

const { DIFFICULTY, NONCE, MINE_RATE } = require("../config");
class Block {
	constructor(timestamp, hash, lastHash, data, nonce, difficulty = DIFFICULTY) {
		this.timestamp = timestamp;
		this.hash = hash;
		this.lastHash = lastHash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	toString() {
		return `Block -
            Timestamp : ${this.timestamp}
            Hash      : ${this.hash.substring(0, 10)}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Data      : ${this.data}
			Nonce	:${this.nonce}
			DIFFICULTY: ${this.difficulty}`;
	}

	static genesis() {
		return new this("Genesis time", "-------", "$@t0$hi N@k@m0t0", "Genesis", NONCE, DIFFICULTY);
	}

	static mineBlock(lastBlock, data) {
		let hash,
			timestamp,
			nonce = 0;
		let lastHash = lastBlock.hash;
		let { difficulty } = lastBlock;

		// Proof-of-work
		do {
			timestamp = Date.now();
			difficulty = this.adjustDifficulty(lastBlock, timestamp);
			nonce++;
			hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
		} while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

		return new this(timestamp, hash, lastHash, data, nonce, difficulty);
	}

	static hash(timeStamp, lastHash, data, nonce, difficulty) {
		return ChainUtil.hash(`${timeStamp}${lastHash}${data}${nonce}${difficulty}`).toString();
	}

	static blockHash(block) {
		const { timestamp, lastHash, data, nonce, difficulty } = block;
		return this.hash(timestamp, lastHash, data, nonce, difficulty);
	}

	static adjustDifficulty(lastBlock, currentTime) {
		let { difficulty } = lastBlock;
		difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
		return difficulty;
	}
}

module.exports = Block;
