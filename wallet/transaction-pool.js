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
		return this.transactionPool.find((t) => t.input.address === senderAddress);
	}
}

module.exports = TransactionPool;
