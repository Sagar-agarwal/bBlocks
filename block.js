const SHA256 = require("crypto-js/sha256");

class Block {
	constructor(timestamp, hash, lastHash, data) {
		this.timestamp = timestamp;
		this.hash = hash;
		this.lastHash = lastHash;
		this.data = data;
	}

	toString() {
		return `Block -
            Timestamp : ${this.timestamp}
            Hash      : ${this.hash.substring(0, 10)}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Data      : ${this.data}`;
	}

	static genesis() {
		return new this("Genesis time", "-------", "$@t0$hi N@k@m0t0", "Genesis");
	}

	static mineBlock(lastBlock, data) {
		let timestamp = Date.now();
		let lastHash = lastBlock.hash;
		let hash = this.hash(timestamp, lastHash, data);

		return new this(timestamp, hash, lastHash, data);
	}

	static hash(timeStamp, lastHash, data) {
		return SHA256(`${timeStamp}${lastHash}${data}`).toString();
	}

	static blockHash(block) {
		const { timestamp, lastHash, data } = block;
		return this.hash(timestamp, lastHash, data);
	}
}

module.exports = Block;
