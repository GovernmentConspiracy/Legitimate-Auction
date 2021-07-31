console.log("Starting...");
require('dotenv');

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN)
client.on('ready', () => {
	console.log("Hello, world!");
})