const Blockchain = require("./index");
const Block = require("./block");
const { blockStatement, emptyTypeAnnotation } = require("@babel/types");

describe("Blockchain", () => {
	let blockchain, block, data, bc2;

	beforeEach(() => {
		data = "foo";
		blockchain = new Blockchain();
		block = blockchain.addBlock(data);

		bc2 = new Blockchain();
		block2 = bc2.addBlock(data);
	});

	it("BlockChain is instance of Blockchain", () => {
		expect(blockchain).toBeInstanceOf(Blockchain);
	});

	it("Block chain Created", () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it("Validates a valid chain", () => {
		expect(blockchain.isValidChain(bc2.chain)).toBeTruthy();
	});

	it("Invalidates a chain with a corrupt genesis block", () => {
		let invalidBlock = bc2.addBlock("corrupt");
		blockchain.chain[0] = invalidBlock;
		expect(blockchain.isValidChain(blockchain.chain)).toBeFalsy();
	});

	it("Invalidates a chain with a corrupt genesis block DATA", () => {
		blockchain.chain[0].data = "Corrupt data";
		expect(blockchain.isValidChain(blockchain.chain)).toBeFalsy();
	});

	it("Invalidates a corrupt chain", () => {
		blockchain.chain[1].data = "Corrupt data";
		console.log(blockchain.chain[1].toString());
		expect(blockchain.isValidChain(blockchain.chain)).toBeFalsy();
	});

	// chain is valid as input
	it("New chain is a valid chain", () => {
		bc2.addBlock("bar");
		blockchain.replaceChain(bc2.chain);

		expect(blockchain.chain).toEqual(bc2.chain);
	});

	// chain is longer
	it("New chain is longer than current chain", () => {
		bc2.addBlock("bar");
		bc2.addBlock("baz");
		blockchain.replaceChain(bc2.chain);

		expect(blockchain.chain).toEqual(bc2.chain);
	});

	// New chain is shorter than current chain
	it("New chain is shorter than current chain", () => {
		blockchain.addBlock("bar");
		blockchain.addBlock("baz");
		blockchain.replaceChain(bc2.chain);

		expect(blockchain.chain).not.toEqual(bc2.chain);
	});

	// chain is replaced
	it("Current chain is replaced with new Chain", () => {
		bc2.addBlock("bar");
		blockchain.replaceChain(bc2.chain);

		expect(blockchain.chain).toEqual(bc2.chain);
	});

	// last block is replaced
	it("Chain lastBlock property is replaced", () => {
		bc2.addBlock("bar");
		bc2.addBlock("baz");
		blockchain.replaceChain(bc2.chain);

		expect(blockchain.lastBlock).toEqual(bc2.lastBlock);
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
