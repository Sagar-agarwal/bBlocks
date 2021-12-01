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

	describe("mix valid and invalid transactions", () => {
		let validTransactions;

		beforeEach(() => {
			validTransactions = [...transactionPool.transactions];

			for (let i = 0; i < 10; i++) {
				wallet = new Wallet();
				recipient = `r3c1p13nt-${i}`;
				amount = 50;
				transaction = wallet.createTransaction(recipient, amount, transactionPool);
				if (i % 2 === 0) {
					transaction.input.amount = 9999;
				} else {
					validTransactions.push(transaction);
				}
			}
		});

		it("Show difference valid and corrupt transaction", () => {
			expect(JSON.stringify(transactionPool.transactions)).not.toEqual(validTransactions);
		});

		it("Get valid transactions", () => {
			expect(transactionPool.validTransactions()).toEqual(validTransactions);
		});
	});
});
