/**
 * One auction is used per server.
 */
import {Queue} from './queue'
import {Lot} from './lot'
import { Snowflake } from 'discord-api-types';

export class Auction {
	readonly serverID: string;
	private readonly queue: Queue<Lot>;
	private currentLot: Lot;
	private readonly traderBlacklist: Set<Snowflake>;
	private readonly roleBlacklist: Set<Snowflake>;
	// private auctionOn: boolean;

	constructor(serverID: Snowflake) {
		this.serverID = serverID;
		this.queue = new Queue<Lot>();
		this.traderBlacklist = new Set();
		// this.auctionOn = true;
		this.currentLot = null;
	}
	
	public addBid(buyer: Snowflake, raise: number) {
		if (this.currentLot === null) {
			throw new Error("There are no current trades.");
		}

		if (this.isBlacklisted(buyer)) {
			throw new Error("Bidder is blacklisted from trade.");
		}
		this.currentLot.addBid(buyer, raise);
	}

	public isBlacklisted(trader: Snowflake): boolean {
		return this.traderBlacklist.has(trader);
	}

	private warnBlacklist(trader: Snowflake) {
		if (this.isBlacklisted(trader)) {
			throw new Error(`${trader} is blacklisted from trade.`);
		}
	}
	
	// TODO next steps
	
}