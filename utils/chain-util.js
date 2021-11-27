const EC = require("elliptic").ec;
const { v1: UuidV1 } = require("uuid");
const SHA256 = require("crypto-js/sha256");

const ec = new EC("secp256k1");

class ChainUtil {
	constructor() {}

	static genKeyPair() {
		return ec.genKeyPair();
	}

	static getID() {
		return UuidV1();
	}

	static hash(data) {
		return SHA256(JSON.stringify(data)).toString();
	}
}

module.exports = ChainUtil;
