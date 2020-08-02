const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const axios = require('axios').default;

const options = {
    method: 'GET',
    headers: {'content-type': 'application/json'}
}

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
    }else if (command === 'villagers'){
        villagers = () => {
            return axios.get('https://acnhapi.com/v1/villagers/ant00')
                .then((response)=>{
                    let villager = {
                        name: response.data.name['name-USen'],
                        personality: response.data.personality,
                        birthday: response.data.birthday
                    } 

                    return villager
                })
        }

        villagers()
            .then(data => {
                message.channel.send(`Villager Name: ${data.name}\nPersonality: ${data.personality}\nBirthday: ${data.birthday}`);
            })
    }else if (command === 'fish'){
        fish = () => {
            return axios.get('https://acnhapi.com/v1/fish/1')
                .then((response)=>{
                    let fish = {
                        name: response.data.name['name-USen'],
                        price: response.data.price,
                        phrase: response.data['museum-phrase']
                    } 

                    return fish
                })
        }

        fish()
            .then(data => {
                message.channel.send(`Name: ${data.name}\nPrice: ${data.price}\nPhrase: ${data.phrase}`);
            })
    }else if (command === 'bugs'){
        bugs = () => {
            return axios.get('https://acnhapi.com/v1/bugs/1')
                .then((response)=>{
                    let bugs = {
                        name: response.data.name['name-USen'],
                        price: response.data.price,
                        phrase: response.data['museum-phrase']
                    } 

                    return bugs
                })
        }

        bugs()
            .then(data => {
                message.channel.send(`Name: ${data.name}\nPrice: ${data.price}\nPhrase: ${data.phrase}`);
            })
    }
});

client.login(token).catch((error) => console.log(error));