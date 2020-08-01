const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    console.log(args);
    console.log(command);

    if (command === 'ping') {
        message.channel.send('Pong.');
    }else if (command === 'shagne'){
        message.channel.send('Is smol');
    }
});

client.login(token).catch((error) => console.log(error));