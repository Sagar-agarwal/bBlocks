const EC = require("elliptic").ec;
const { v1: UuidV1 } = require("uuid/v1");

const ec = new EC("secp256k1");

class ChainUtil {
	constructor() {}

	static genKeyPair() {
		return ec.genKeyPair();
	}

	static getID() {
		return UuidV1();
	}
}

module.exports = ChainUtil;
