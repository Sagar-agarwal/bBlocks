const { INITIAL_BALANCE } = require("../config");
const Transaction = require("./transaction");
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

	createTransaction(recipient, amount, transactionPool) {
		if (amount > this.balance) {
			console.log(`Amount ${amount} exceeds the available balance of ${this.balance}`);
		}

		let transaction = transactionPool.existingTransaction(this.publicKey);
		transaction = transaction
			? transaction.updateTransaction(this, recipient, amount)
			: Transaction.newTransaction(this, recipient, amount);

		transactionPool.updateOrAddTransaction(transaction);

		return transaction;
	}
}

module.exports = Wallet;
