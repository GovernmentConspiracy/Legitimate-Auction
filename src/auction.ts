/**
 * One auction is used per server.
 */
import {Queue} from './queue'
import {Lot} from './lot'

export class Auction {
	readonly serverID: number
	private readonly queue: Queue<Lot>
	private readonly blacklist: Set<number>

	constructor(serverID: number) {
		this.serverID = serverID;
		this.queue = new Queue<Lot>();
	}
	
	
	// TODO next steps
	
}