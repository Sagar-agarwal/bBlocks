const Block = require("./block");
const { DIFFICULTY } = require("../config");

describe("Block", () => {
	let block, timestamp, data, lastBlock;

	beforeEach(() => {
		timestamp = Date.now();
		data = "foo";
		lastBlock = Block.genesis();

		block = Block.mineBlock(lastBlock, "foo");
	});

	it("has a timestamp", () => {
		expect(block.timestamp).not.toBeUndefined();
	});

	it("has a hash", () => {
		expect(block.hash).not.toBeUndefined();
	});

	it("has a lastHash", () => {
		expect(block.lastHash).not.toBeUndefined();
	});

	it("has data", () => {
		expect(block.data).toEqual("foo");
	});

	it("Generates the hash that matched the difficulty", () => {
		expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty));
	});

	it("Increases the difficulty for slowly mined block", () => {
		expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
		console.log(`difficulty >> ${block.difficulty}`);
	});

	it("Lowers the difficulty for slowly mined block", () => {
		expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
	});
});

describe("genesis()", () => {
	it("returns a block", () => {
		let genesis = Block.genesis();
		expect(genesis).toBeInstanceOf(Block);
	});

	it("returns a genesis block", () => {
		let genesis = Block.genesis();
		expect(genesis.data).toEqual("Genesis");
	});
});

describe("mineBlock()", () => {
	let lastBlock;

	beforeEach(() => {
		lastBlock = new Block("foo");
	});

	it("returns a block", () => {
		let minedBlock = Block.mineBlock(lastBlock, "bar");
		expect(minedBlock).toBeInstanceOf(Block);
	});

	it("sets the lastHash to be the hash of the lastBlock", () => {
		let minedBlock = Block.mineBlock(lastBlock, "bar");
		expect(minedBlock.lastHash).toEqual(lastBlock.hash);
	});

	it("sets the data to be the data passed in", () => {
		let minedBlock = Block.mineBlock(lastBlock, "bar");
		expect(minedBlock.data).toEqual("bar");
	});

	it("sets the timestamp", () => {
		let minedBlock = Block.mineBlock(lastBlock, "bar");
		expect(minedBlock.timestamp).not.toBeUndefined();
	});

	it("sets the hash", () => {
		let minedBlock = Block.mineBlock(lastBlock, "bar");
		expect(minedBlock.hash).not.toBeUndefined();
	});
});
