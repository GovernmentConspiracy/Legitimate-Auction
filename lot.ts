class Lot {
	
	readonly seller: string

	readonly item: string

	readonly description: string

	readonly startingBid: number

	bid: number

	increment: number

	readonly buyout: number

	/**
	 * Creates an auction lot instance.
	 * @param {string} seller		Seller's name
	 * @param {string} item			Item(s) name
	 * @param {string} desciption 	Item(s) description
	 * @param {number} startingBid	Lowest possible bid. 
	 * @param {number} increment 	Minimum bid increase
	 * @param {number} buyout 		Maximum bid when auction ends. Default to 0 if no buyout.
	 */
	constructor(seller: string, item: string, desciption: string, startingBid: number, increment: number, buyout: number) {
		this.seller = seller;
		this.item = item;
		this.description = desciption;
		this.startingBid = startingBid;
		this.bid = 0;
		this.increment = increment;
		this.buyout = buyout;
	} 	

	
}