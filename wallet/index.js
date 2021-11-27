const { INITIAL_BALANCE } = require("../config");
const ChainUtil = require("../utils/chain-util");

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = ChainUtil.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode("hex");
	}

	toString() {
		return `-- Wallet --
        Balance  : ${this.balance}
        publicKey: ${this.publicKey.toString()} 
        `;
	}

	sign(dataHash) {
		return this.keyPair.sign(dataHash);
	}
}

module.exports = Wallet;
