const Wallet = require("./index");
const Transaction = require("./transaction");
const TransactionPool = require("./transaction-pool");
const { INITIAL_BALANCE } = require("../config");

describe("Wallet", () => {
	let wallet, tp;

	beforeEach(() => {
		wallet = new Wallet();
		tp = new TransactionPool();
	});

	it("Wallet initial balance is correct", () => {
		expect(wallet.balance).toEqual(INITIAL_BALANCE);
	});

	describe("creating transactions", () => {
		let recipient, amount, transaction;

		beforeEach(() => {
			recipient = "r3c1p13nt";
			amount = 50;
			transaction = wallet.createTransaction(recipient, amount, tp);
		});

		describe("and doing the same transaction", () => {
			beforeEach(() => {
				wallet.createTransaction(recipient, amount, tp);
			});

			it("doubles the `sendAmount` subtracted from the wallet balance", () => {
				expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount).toEqual(
					wallet.balance - amount * 2
				);
			});

			it("clones the `sendAmount` output for the recipient", () => {
				expect(
					transaction.outputs.filter((output) => output.address === recipient).map((output) => output.amount)
				).toEqual([amount, amount]);
			});
		});
	});
});
