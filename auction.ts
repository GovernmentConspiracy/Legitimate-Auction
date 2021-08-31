/**
 * One auction is used per server.
 */
require('./lot.ts')

class Auction {
    #serverID: number
    #queue: Lot[]
}