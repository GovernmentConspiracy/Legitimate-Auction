console.log("Loading...");

require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const startMilli = Date.now();
const PREFIX = '$';

console.log("Starting: %s", Date());

bot.once("ready", () => {
	console.log("Ready: %dms\n", Date.now() - startMilli);
	console.log("Hello, world!");
});

async function getNutted(msg) {

		const nutEmoji = '🥜';
		const nuttedMsg = await msg.channel.send('Who is deez?', { fetchReply: true });
	
		const filter = (reaction, user) => {
			return nutEmoji === reaction.emoji.name && user.id != bot.user.id
		};
	
		await nuttedMsg.react(nutEmoji)
			nuttedMsg.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();
					
					map = reaction.users.cache;
					map.delete(bot.user.id);
					msg.channel.send(`deez nuts ${map.first().toString()}`);
					
				})
				.catch(() => {
					msg.channel.send(`Come on ${msg.author.toString()}, react to the message.`);
				});


}

bot.on("message", async (message) => {

	// console.log(msg.content)
	// Ignores bot messages
	if (message.author.bot) {
		return;
	}

	if (message.content === "!deez") {
		getNutted(message);
		return;
	}

	// Ignores no prefix.
	if (!message.content.startsWith(PREFIX)) {
		return;
	}

	const [cmd, ...args] = message.content
		.trim() // Remove whitespace
		.substring(PREFIX.length) // Remove prefix
		.split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/) //Splits // 

	console.log(`Command: ${cmd}`);
	console.log(`Args: ${args}`);
		
	if (cmd === "auction") {
		if (args.length === 0) {
			return message.reply("Type $auction help for commands.")
		}
		message.channel.send(`Command: $auction [${args.join(", ")}]`);
	}
})

bot.login(process.env.BOT_TOKEN);
