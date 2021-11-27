const Wallet = require("./index");
const Transaction = require("./transaction");
const { INITIAL_BALANCE } = require("../config");

describe("Wallet", () => {
	let wallet;

	beforeEach(() => {
		wallet = new Wallet();
	});

	it("Wallet initial balance is correct", () => {
		expect(wallet.balance).toEqual(INITIAL_BALANCE);
	});
});
