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
            Hash      : ${this.hash}
            Last Hash : ${this.lastHash}
            Data      : ${this.data}`;
	}

	static genesis() {
		return new this("Genesis time", "-------", "$@t0$hi N@k@m0t0", "[]");
	}

	static mineBlock(lastBlock, data) {
		let timestamp = Date.now();
		let lastHash = lastBlock.hash;
		let hash = "todo-hash";

		// let hash = Block.hash(timestamp, lastHash, data);

		return new this(timestamp, hash, lastHash, data);
	}
}

module.exports = Block;
