/**
 * One auction is used per server.
 */
import {Queue} from './queue'
import {Lot} from './lot'
import { Snowflake, Guild } from 'discord.js';

export class Auction {
	readonly server: Guild;
	private readonly queue: Queue<Lot>;
	// private readonly currentLots: {}; //TODO: (map or js object?)

	/** 
	 * Blacklist
	 */
	private readonly traderBlacklist: Set<Snowflake>;
	// private readonly roleBlacklist: Set<Snowflake>;

	private auctionOn: boolean;

	constructor(server: Guild) {
		this.server = server;
		this.queue = new Queue<Lot>();
		this.traderBlacklist = new Set<Snowflake>();
		
		// this.roleBlacklist = new Set<Snowflake>();
		this.auctionOn = true;
	}

	public getCurrentLot(): Lot | undefined {
		if (this.queue.isEmpty()) {
			throw new Error("There are no current trades.");
		}
		return this.queue.peek();
	}
	
	public addBid(buyer: Snowflake, raise: number) {
		let currentLot = this.getCurrentLot();

		if (currentLot === undefined) {
			throw new Error("There are no current trades.");
		}

		if (this.isBlacklisted(buyer)) {
			throw new Error("Bidder is blacklisted from trade.");
		}
		currentLot.addBid(buyer, raise);
	}

	public addLot(lot: Lot) {
		//TODO
		if (lot.seller) {

		}
	}

	private isBlacklisted(trader: Snowflake): boolean {
		// this.roleBlacklist.forEach((key) => {
		// 	if (this.server.) {
		// 		return true;
		// 	}
		// })

		return this.traderBlacklist.has(trader);
	}

	private warnBlacklist(trader: Snowflake) {
		if (this.isBlacklisted(trader)) {
			throw new Error(`${trader} is blacklisted from trade.`);
		}
	}
	
	// TODO next steps
	
}