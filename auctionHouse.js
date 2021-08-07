/**
 * Auction handler for each server.
 */

const Discord = require("discord.js");
// const Auction = require(auction);
const PREFIX = '$';
const serverAuctions = new Map()

const commandMap = {
	"au": auctionParser,
	"auction": auctionParser,
	"bid": (message, cmd, args) => {
		auctionParser(message, "auction", [cmd].concat(args))
	},
	"deez": getNutted
}

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

/**
 * 4 meta commands: help, bid, create, delete, settings
 * @param {Discord.Message} message 
 * @param {String} cmd 
 * @param {String} args 
 * @returns 
 */
function auctionParser(message, cmd, args) {
	const {channel} = message;
	if (args.length === 0) {
		return message.reply(`Type $${cmd} help for commands.`)
	}
	channel.send(`Command: ${PREFIX}${cmd} [${args.join(", ")}]`);
}

exports.auctionHouseInit = () => {
	//TODO: more here
	console.log("Auction handler is up.");
};

/**
 * 
 * @param {Discord.Message} message 
 */
exports.auctionHandler = async (message) => {
	const {author, content} = message;

	// Ignores bot messages
	if (author.bot) {
		return;
	}
	
	// Ignores no prefix.
	if (!content.startsWith(PREFIX)) {
		return;
	}

	const [cmd, ...args] = content
		.trim()										// Remove whitespace
		.substring(PREFIX.length)					// Remove prefix
		.split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/)	// TODO: fix if unbalanced quotation marks.

	console.log(`Command: ${cmd}`);
	console.log(`Args: ${args}`);

	if (commandMap[cmd]) {
		commandMap[cmd](message, cmd, args);
	}
}


function createNewAuction(key) {
	// serverAuctions.set(key, new Auction());
}