console.log("Loading...");

require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const startMilli = Date.now()

console.log("Starting: %s", Date());
bot.login(process.env.BOT_TOKEN)
bot.on('ready', () => {
	console.log("Ready: %dms\n", Date.now() - startMilli);
	console.log("Hello, world!");
})

