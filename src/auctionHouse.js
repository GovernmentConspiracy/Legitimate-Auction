/**
 * Auction handler. Handles messages for each discord guild.
 */

const Discord = require('discord.js');
const Auction = require('./auction')
const PREFIX = '$';
const serverAuctions = new Map(); // {guildID to Auction}

const commandMap = {
	"au": auctionParser,
	"auction": auctionParser,
	"bid": (message, cmd, args) => {
		auctionParser(message, "auction", [cmd].concat(args))
	},
	"test": getNutted,
	"deez": getNutted
}

// TODO
const auctionCommandMap = {
	"bid": (message, args) => {
		message.reply(`You bid ${args[0]}.`);
	},
	"create": todoFunct,
	"delete": todoFunct,
	"help": todoFunct,
	"settings": todoFunct
}

function todoFunct() {
	console.log("TODO11!!");
}

/**
 * Nuts the user. Test command which does not require the auction handler to work.
 * @param {Discord.Message} message 
 */
async function getNutted(message) {
	const {author, channel} = message;
	const nutEmoji = '🥜';
	const nuttedMsg = await message.reply('Who is deez?', { fetchReply: true });

	const filter = (reaction, user) => {
		return nutEmoji === reaction.emoji.name && !user.bot
	};

	await nuttedMsg.react(nutEmoji)

	nuttedMsg.awaitReactions({filter, max: 1, time: 10000, errors: ['time'] })
		.then((collected) => {
			console.log(`Reaction clicked: ${nutEmoji}`);
			const reaction = collected.first();
			
			let map = reaction.users.cache;
			map.delete(nuttedMsg.author.id);
			channel.send(`deez nuts lmao ${map.first().toString()}`);
			
		})
		.catch(() => {
			channel.send(`Come on ${author.toString()}, react to the message.`);
		});
}

/**
 * 5 meta commands: help, bid, create, delete, settings
 * @param {Discord.Message} message 
 * @param {String} cmd 
 * @param {String[]} args 
 * @returns 
 */
function auctionParser(message, cmd, args) {
	const {channel} = message;
	if (args.length === 0) {
		message.reply(`Type ${PREFIX}${cmd} help for commands.`);
		return;
	}
	channel.send(`Command: ${PREFIX}${cmd} [${args.join(", ")}]`);

	const [meta, ...params] = args;
	let auctionFunction = auctionCommandMap[meta];
	if (!auctionFunction) {
		message.reply(`No such command for ${PREFIX}${cmd} ${meta}.`);
		return;
	}
	auctionFunction(message, params);
}

exports.auctionHouseInit = () => {
	//TODO: more here, i.e. load settings from a json file XOR use database
	console.log("Some database stuff here.");
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
	let commandFunction = commandMap[cmd];
	if (commandFunction) {
		commandFunction(message, cmd, args);
	}
}

function createNewAuction(key) {
	serverAuctions.set(key, new Auction());
}

function getAuction(key) {
	return serverAuctions.get(key);
}