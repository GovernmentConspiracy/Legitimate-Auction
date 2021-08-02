console.log("Loading...");

require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const startMilli = Date.now();
console.log("Starting: %s", Date());

bot.once("ready", () => {
	console.log("Ready: %dms\n", Date.now() - startMilli);
	console.log("Hello, world!");
});

bot.on("message", async (msg) => {
	console.log(msg.content)

	
	if (msg.content === "!deez") {
		const nutEmoji = '🥜';
		const message = await msg.channel.send('Who is deez?', { fetchReply: true });

		const filter = (reaction, user) => {
			return nutEmoji === reaction.emoji.name && user.id != bot.user.id
		};

		await message.react(nutEmoji)
			message.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();
					
					map = reaction.users.cache;
					map.delete(bot.user.id);
					msg.channel.send(`deez nuts ${map.first().toString()}`);
					
				})
				.catch((collected) => {
					msg.channel.send(`Come on ${msg.author.toString()}, react to the message.`);
				});
		
		
	}
})

bot.login(process.env.BOT_TOKEN);
