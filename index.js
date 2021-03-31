// Read environment variables in. One of these is expected to be the
// BOT_TOKEN from discord.
const dotenv = require('dotenv');
dotenv.config();

const Discord = require("discord.js");

const client = new Discord.Client();
const prefix = "!";

client.login(process.env.BOT_TOKEN)

client.on("message", function(message) {
    // Don't respond to messages from bots
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const body = message.content.slice(prefix.length);
    const args = body.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "ping") {
	const timeTaken = Date.now() - message.createdTimestamp;
	message.reply(`pong - latency: (${timeTaken}ms)`);
    }
})
