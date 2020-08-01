const Discord = require('discord.js');
const client = new Discord.Client();
const apikey = require('./keys.js');

client.once('ready', () => {
	console.log('Ready!');
});

client.login(apikey.apikey).catch((error) => console.log(error));