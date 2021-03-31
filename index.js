// Read environment variables in. One of these is expected to be the
// BOT_TOKEN from discord.
const dotenv = require('dotenv');
const http = require('http');
const Discord = require("discord.js");

dotenv.config();
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

    if (command == "btc") {
	http.get({
            host: 'api.coindesk.com',
            path: '/v1/bpi/currentprice.json'
        }, function(response) {
            var body = '';
            response.on('data', function(d) { body += d; });
            response.on('end', function() {
                var parsed = JSON.parse(body);
		message.reply(`$${parsed.bpi.USD.rate}`)
            });
	});
    }
})
