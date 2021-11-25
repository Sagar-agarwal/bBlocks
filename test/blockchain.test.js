const Blockchain = require("../blockchain");
const Block = require("../block");

describe("Blockchain", () => {
	let blockchain, block, data;

	beforeEach(() => {
		data = "foo";
		blockchain = new Blockchain();
		block = new Block(data);
	});

	it("BlockChain is instance of Blockchain", () => {
		expect(blockchain).toBeInstanceOf(Blockchain);
	});

	it("Block chain Created", () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});
});

describe("Blockchain block", () => {
	let blockchain, block, data;

	beforeEach(() => {
		data = "foo";
		blockchain = new Blockchain();
		block = blockchain.addBlock(data);
	});

	it("Block added to chain", () => {
		expect(blockchain.lastBlock).toBeInstanceOf(Block);
	});

	it("Block data is correct", () => {
		expect(blockchain.lastBlock.data).toEqual(data);
	});
});
