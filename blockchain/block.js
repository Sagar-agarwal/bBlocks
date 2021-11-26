const SHA256 = require("crypto-js/sha256");

const { DIFFICULTY } = require("../config");
class Block {
	constructor(timestamp, hash, lastHash, data, nonce) {
		this.timestamp = timestamp;
		this.hash = hash;
		this.lastHash = lastHash;
		this.data = data;
		this.nonce = nonce;
	}

	toString() {
		return `Block -
            Timestamp : ${this.timestamp}
            Hash      : ${this.hash.substring(0, 10)}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Data      : ${this.data}
			Nonce		:${this.nonce}`;
	}

	static genesis() {
		return new this("Genesis time", "-------", "$@t0$hi N@k@m0t0", "Genesis", 0);
	}

	static mineBlock(lastBlock, data) {
		let hash,
			timestamp,
			nonce = 0;
		let lastHash = lastBlock.hash;

		// Proof-of-work
		do {
			timestamp = Date.now();
			nonce++;
			hash = this.hash(timestamp, lastHash, data, nonce);
		} while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

		return new this(timestamp, hash, lastHash, data, nonce);
	}

	static hash(timeStamp, lastHash, data, nonce) {
		return SHA256(`${timeStamp}${lastHash}${data}${nonce}`).toString();
	}

	static blockHash(block) {
		const { timestamp, lastHash, data, nonce } = block;
		return this.hash(timestamp, lastHash, data, nonce);
	}
}

module.exports = Block;
