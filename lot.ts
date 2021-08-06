class Lot {
	
	#seller: String
	get seller() {
		return this.#seller
	}

	#item: String
	get item() {
		return this.#item
	}

	#description: String
	get description() {
		return this.#description
	}

	#startingBid: Number
	get startingBid() {
		return this.#startingBid
	}

	#bid: Number
	get bid() {
		return this.#bid
	}
	set bid(value) {
		this.#bid = value
	}

	#increment: Number
	get increment() {
		return this.#increment
	}
	set increment(value) {
		this.#increment = value
	}

	#buyout: Number
	get buyout() {
		return this.#buyout
	}
	/**
	 * Creates an auction lot instance.
	 * @param {String} seller		Seller's name
	 * @param {String} item			Item(s) name
	 * @param {String} desciption 	Item(s) description
	 * @param {Number} startingBid	Lowest possible bid. 
	 * @param {Number} increment 
	 * @param {Number} buyout 
	 */
	constructor(seller: String, item: String, desciption: String, startingBid: Number, increment: Number, buyout: Number) {
		this.#seller = seller;
		this.#item = item;
		this.#description = desciption;
		this.#startingBid = startingBid;
		this.#bid = this.#startingBid;
		this.#increment = increment;
		this.#buyout = buyout;
	} 	

	
}