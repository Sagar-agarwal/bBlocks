const Wallet = require("./index");
const Transaction = require("./transaction");
const TransactionPool = require("./transaction-pool");
const Conf = require("../config");

describe("Transaction Pool", () => {
	let wallet, recipient, amount, transaction;

	beforeEach(() => {
		wallet = new Wallet();
		recipient = "r3c1p13nt";
		amount = 50;
		transaction = Transaction.newTransaction(wallet, recipient, amount);
		transactionPool = new TransactionPool();
	});

	it("Add New Transaction to the Pool", () => {
		transactionPool.updateOrAddTransaction(transaction);
		expect(transactionPool.transactions.find((t) => t.id === transaction.id)).toEqual(transaction);
	});

	it("Update Existing transaction in the pool", () => {
		const oldTransaction = transaction;
		const newTransaction = oldTransaction.updateTransaction(wallet, recipient, amount + 1);
		transactionPool.updateOrAddTransaction(oldTransaction);
		transactionPool.updateOrAddTransaction(newTransaction);
		expect(transactionPool.transactions.find((t) => t.id === oldTransaction.id)).toEqual(newTransaction);
	});

	it("Update Existing transaction in the pool with new data", () => {
		const oldTransactionJSON = JSON.stringify(transaction);
		transactionPool.updateOrAddTransaction(transaction);
		const newTransaction = transaction.updateTransaction(wallet, recipient, amount + 1);
		transactionPool.updateOrAddTransaction(newTransaction);
		expect(transactionPool.transactions.find((t) => t.id === newTransaction.id)).not.toEqual(oldTransactionJSON);
	});

	// it("Allow a second transaction to be added if the first has not been mined", () => {});
});
