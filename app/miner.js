class Miner {
	constructor(blockchain, transactionPool, wallet, p2pServer) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.p2pServer = p2pServer;
	}

	mine() {
		const validTransactions = this.transactionPool.validTransactions();

		// create reward transaction
		// create a block consisting of valid transaction
		// synchronize chains in the peer to peer server
		// Clear the local transaction pool
		// broadcast to every miner to clear their transaction pool
		// broadcast the new block to the network
	}
}

module.exports = Miner;
