const Transaction = require("../wallet/transaction");

class TransactionPool {
	constructor() {
		this.transactions = [];
	}

	updateOrAddTransaction(transaction) {
		let transactionID = this.transactions.find((t) => t.id === transaction.id);

		if (transactionID) {
			this.transactions[this.transactions.indexOf(transactionID)] = transaction;
		} else {
			this.transactions.push(transaction);
		}
	}

	existingTransaction(senderAddress) {
		return this.transactions.find((t) => t.input.address === senderAddress);
	}

	validTransactions() {
		return this.transactions.filter((transaction) => {
			const outputTotal = transaction.outputs.reduce((total, output) => total + output.amount, 0);

			if (transaction.input.amount !== outputTotal) {
				console.log(`Invalid transaction from ${transaction.input.address}`);
				return;
			}

			if (!Transaction.verifyTransaction(transaction)) {
				console.log(`Invalid transaction signature from ${transaction.input.address}`);
				return;
			}

			return transaction;
		});
	}
}

module.exports = TransactionPool;
