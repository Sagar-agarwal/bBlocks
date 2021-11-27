const { INITIAL_BALANCE } = require("../config");

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = null;
		this.publicKey = null;
	}

	toString() {
		return `-- Wallet --
        Balance  : ${this.balance}
        publicKey: ${this.publicKey.toString()} 
        `;
	}
}

module.export = Wallet;
