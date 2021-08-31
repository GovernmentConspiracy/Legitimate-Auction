class Lot {
	
	#seller: string
	get seller() {
		return this.#seller
	}

	#item: string
	get item() {
		return this.#item
	}

	#description: string
	get description() {
		return this.#description
	}

	#startingBid: number
	get startingBid() {
		return this.#startingBid
	}

	#bid: number
	get bid() {
		return this.#bid
	}
	set bid(value) {
		this.#bid = value
	}

	#increment: number
	get increment() {
		return this.#increment
	}
	set increment(value) {
		this.#increment = value
	}

	#buyout: number
	get buyout() {
		return this.#buyout
	}
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
		this.#seller = seller;
		this.#item = item;
		this.#description = desciption;
		this.#startingBid = startingBid;
		this.#bid = 0;
		this.#increment = increment;
		this.#buyout = buyout;
	} 	

	
}