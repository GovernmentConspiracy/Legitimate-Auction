import { Snowflake } from "discord-api-types";

class Bid{
	readonly bidder: Snowflake
	readonly price: number

	constructor(bidder: Snowflake, price: number) {
		this.bidder = bidder;
		this.price = price;
	}
}

export class Lot {
	readonly seller: Snowflake
	readonly item: string
	readonly description: string
	readonly startingBid: number

	readonly bids: Bid[] //TODO: change to user and bid amount pairs
	
	readonly increment: number
	readonly buyout: number

	/**
	 * Creates an auction lot instance.
	 * @param {Snowflake} seller	Seller's name
	 * @param {string} item			Item(s) name
	 * @param {string} desciption 	Item(s) description
	 * @param {number} startingBid	Lowest possible bid. 
	 * @param {number} increment 	Minimum bid increase
	 * @param {number} buyout 		Maximum bid when auction ends. Default to 0 if no buyout.
	 */
	constructor(seller: Snowflake, item: string, desciption: string, startingBid: number, increment: number, buyout: number = 0) {
		this.seller = seller;
		this.item = item;
		this.description = desciption;
		this.startingBid = startingBid;
		this.bids = [new Bid(null, startingBid)];
		this.increment = increment;
		this.buyout = buyout;
	} 	

	public addBid(buyer: Snowflake, raise:number) {
		if (buyer === this.seller) {
			throw new Error("Seller cannot bid at their own auction.");
		}

		const { bidder, price } = this.getNextBid();
		if (bidder === buyer) {
			throw new Error("Bidder cannot make successive bids.");
		}

		let minRaise = price;
		if (bidder !== null) {
			minRaise += this.increment;
		}

		if (minRaise > raise) {
			throw new Error(`Bidder must bid to at least ${minRaise}.`)
		}

		this.bids.push(new Bid(buyer, raise));
	}

	public getNextBid() : Bid {
		return this.bids[-1];
	}
	
}