const startMilli = Date.now();
console.log("Starting: %s", new Date(startMilli));

require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = Discord
const Auction = require('./auctionHouse');

const bot = new Client({intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]});


bot.once("ready", () => {
	console.log("%s is ready: %dms\n", bot.user.tag, Date.now() - startMilli);
	console.log("Hello, world!");
	Auction.auctionHouseInit();
});


bot.on("messageCreate", Auction.auctionHandler);

bot.login(process.env.BOT_TOKEN);
