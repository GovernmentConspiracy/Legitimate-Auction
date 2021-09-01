/**
 * One auction is used per server.
 */
import {Queue} from './queue'
import {Lot} from './lot'

export class Auction {
	readonly serverID: number
	readonly queue: Queue<Lot>

	constructor(serverID: number) {
		this.serverID = serverID;
		this.queue = new Queue<Lot>();
		
	}
	
}