const startMilli = Date.now();
console.log("Starting: %s", new Date(startMilli));

require('dotenv').config();
const Discord = require('discord.js');	
const Auction = require('./auctionHouse');

const bot = new Discord.Client();


bot.once("ready", () => {
	console.log("%s is ready: %dms\n", bot.user.tag, Date.now() - startMilli);
	console.log("Hello, world!");
	Auction.auctionHouseInit();
});


bot.on("message", Auction.auctionHandler);

bot.login(process.env.BOT_TOKEN);
