const express = require("express");
const P2pServer = require("./p2p-server");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const Wallet = require("../wallet");
const TransactionPool = require("../wallet/transaction-pool");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.use(bodyParser.json());

// GET Calls
app.get("/", (req, res) => {
	res.json("b_blocks here !!");
});

app.get("/blocks", (req, res) => {
	res.json(bc.chain);
});

app.get("/myWallet", (req, res) => {
	res.json({
		address: wallet.publicKey,
		balance: wallet.balance,
	});
});

app.get("/public-key", (req, res) => {
	res.json({ publicKey: wallet.publicKey });
});

app.get("/transactions", (req, res) => {
	res.json(tp.transactions);
});

// POST Calls
app.post("/mine", (req, res) => {
	const block = bc.addBlock(req.body.data);
	console.log(`New Block added: ${block.toString()}`);
	p2pServer.syncChains();

	res.redirect("/blocks");
});

app.post("/transact", (req, res) => {
	const { recipient, amount } = req.body;
	const transaction = wallet.createTransaction(recipient, amount, tp);
	p2pServer.broadcastTransaction(transaction);
	res.redirect("/transactions");
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
