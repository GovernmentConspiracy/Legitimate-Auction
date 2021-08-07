/**
 * Auction handler for each server.
 */

const Discord = require("discord.js");
// const Auction = require(auction);
const PREFIX = '$';
const serverAuctions = new Map()


/**
 * Nuts the user. Test command which does not require
 * @param {Discord.Message} message 
 */
 async function getNutted(message) {
	const {author, channel} = message;
	const nutEmoji = '🥜';
	const nuttedMsg = await channel.send('Who is deez?', { fetchReply: true });

	const filter = (reaction, user) => {
		return nutEmoji === reaction.emoji.name && !user.bot
	};

	await nuttedMsg.react(nutEmoji)
		nuttedMsg.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
			.then((collected) => {
				const reaction = collected.first();
				
				map = reaction.users.cache;
				map.delete(nuttedMsg.author.id);
				channel.send(`deez nuts lmao ${map.first().toString()}`);
				
			})
			.catch(() => {
				channel.send(`Come on ${author.toString()}, react to the message.`);
			});


}

exports.auctionHouseInit = () => {
	console.log("Auction handler is up.");
};

/**
 * 
 * @param {Discord.Message} message 
 */
exports.auctionHandler = async (message) => {
	const {author, content, channel} = message;

	// Ignores bot messages
	if (author.bot) {
		return;
	}
	
	// Ignores no prefix.
	if (!content.startsWith(PREFIX)) {
		return;
	}

	if (content === `${PREFIX}deez`) {
		getNutted(message);
		return;
	}

	const [cmd, ...args] = content
		.trim()										// Remove whitespace
		.substring(PREFIX.length)					// Remove prefix
		.split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/)	//To do: fix if unbalanced quotation marks.

	console.log(`Command: ${cmd}`);
	console.log(`Args: ${args}`);
		
	if (cmd === "auction" || cmd ==="au") {
		if (args.length === 0) {
			return message.reply("Type $auction help for commands.")
		}
		channel.send(`Command: ${PREFIX}${cmd} [${args.join(", ")}]`);
	}
}

function auctionHouseAdd(key) {
	// serverAuctions.set(key, new Auction());
}