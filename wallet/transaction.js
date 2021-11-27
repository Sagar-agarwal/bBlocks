const ChainUtil = require("../utils/chain-util");

/**
 * outputs = [
 *  {
 *    amount: int, // sender remaining balance
 *   address: string // sender publicKey
 * },
 *  {
 *   amount: int, // Amount sent by sender
 *   address: string // recipient publicKey
 *  }
 * ];
 */

class Transaction {
	constructor() {
		this.id = ChainUtil.getID();
		this.input = null;
		this.outputs = [];
	}

	static newTransaction(senderWallet, recipient, amount) {
		if (amount > senderWallet.balance) {
			console.log(`Amount ${amount} is more than remaining balance ${senderWallet.balance}`);
			return;
		}

		const transaction = new this();
		transaction.outputs.push(
			...[
				{ amount: senderWallet.balance - amount, address: senderWallet.publicKey },
				{ amount: amount, address: recipient },
			]
		);

		Transaction.signTransaction(transaction, senderWallet);

		return transaction;
	}

	static signTransaction(transaction, senderWallet) {
		transaction.input = {
			timestamp: Date.now(),
			amount: senderWallet.balance,
			address: senderWallet.publicKey,
			signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
		};
	}

	static verifyTransaction(transaction) {
		return ChainUtil.verifySignature(
			transaction.input.address,
			transaction.input.signature,
			ChainUtil.hash(transaction.outputs)
		);
	}
}

module.exports = Transaction;
