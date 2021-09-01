/**
 * One auction is used per server.
 */
require('./lot.ts')

class Auction {
    #serverID: number
    #queue: Queue

    constructor(serverID: number) {
		this.#serverID = serverID;
	}

}