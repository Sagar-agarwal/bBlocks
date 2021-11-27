const Wallet = require("./index");
const Transaction = require("./transaction");
const { INITIAL_BALANCE } = require("../config");

describe("Transaction", () => {
	let wallet, recipient, amount, transaction;

	beforeEach(() => {
		wallet = new Wallet();
		recipient = "12qw34er56ty";
		amount = 50;
		transaction = Transaction.newTransaction(wallet, recipient, amount);
	});

	it("Outputs the `amount` subtracted from senders wallet balance", () => {
		expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount).toEqual(
			wallet.balance - amount
		);
	});

	it("Outputs the `amount` added to the recipient", () => {
		expect(transaction.outputs.find((output) => output.address === recipient).amount).toEqual(amount);
	});

	it("`amount` is greater than wallet balance", () => {
		amount = 600;
		transaction = Transaction.newTransaction(wallet, recipient, amount);

		expect(transaction).toBeUndefined();
	});

	it("Transaction has input", () => {
		expect(transaction.input).not.toBeUndefined();
	});

	it("Input has the `wallet`s address", () => {
		expect(transaction.input.address).toEqual(wallet.publicKey);
	});

	it("Input the balance of wallet", () => {
		expect(transaction.input.amount).toEqual(wallet.balance);
	});

	it("Validate a valid transaction", () => {
		expect(Transaction.verifyTransaction(transaction)).toBeTruthy();
	});

	it("Invalidates a corrupt transaction", () => {
		transaction.outputs[0].amount = 50000;
		expect(Transaction.verifyTransaction(transaction)).toBeFalsy();
	});
});
