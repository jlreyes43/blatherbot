const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios').default;
const _ = require('lodash');
require('dotenv').config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

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

    request = () => {
        return axios.get(`https://acnhapi.com/v1/${command}/${args}`)
            .then((response)=>{
                let data = {
                    name: response.data?.name['name-USen'] || 'N/A',
                    price: response.data?.price || 'N/A',
                    cjprice: response.data?.['price-cj'] || 'N/A',
                    flickprice: response.data?.['price-flick'] || 'N/A',
                    time: response.data.availability?.time || 'N/A (or always available)', 
                    location: response.data.availability?.location || 'N/A',
                    rarity: response.data.availability?.rarity || 'N/A',
                    speed: response.data?.speed || 'N/A', 
                    shadow: response.data?.shadow || 'N/A',
                    northAvailability: response.data.availability?.['month-northern'] || 'N/A (or always available)', 
                    southAvailability: response.data.availability?.['month-southern'] || 'N/A (or always available)',
                    phrase: response.data?.['museum-phrase'] || 'N/A'
                } 
                return data
            })
    }

    if (command === 'blathertest') {
        message.channel.send("Hi, I'm Blather!");
    }else if (command === 'shagne'){
        message.channel.send('Is smol');
    }else if (command === 'help'){
        message.channel.send('Hi there! There are 3 available commands: **!fish** `fish_name`, **!bugs** `bug_name`, **!fossils** `fossil_name`. *Hint: If there is a space in the name of the thing, replace the space with _*');
    // }else if (command === 'villagers'){
    //     villagers = () => {
    //         return axios.get('https://acnhapi.com/v1/villagers/ant00')
    //             .then((response)=>{
    //                 let villager = {
    //                     name: response.data.name['name-USen'],
    //                     personality: response.data.personality,
    //                     birthday: response.data.birthday
    //                 } 
    //                 return villager
    //             })
    //     }
    //     villagers()
    //         .then(data => {
    //             message.channel.send(`Villager Name: ${data.name}\nPersonality: ${data.personality}\nBirthday: ${data.birthday}`);
    //         })
    }else if (command === 'fish'){
        request()
            .then(data => {
                const fishEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(_.capitalize(data.name))
                    .setDescription(data.phrase)
                    .setThumbnail(`https://acnhapi.com/v1/icons/${command}/${args}`)
                    .addFields(
                        { name: 'Name', value: _.capitalize(data.name) },
                        { name: 'Price', value: data.price, inline: true  },
                        { name: 'CJ Price', value: data.cjprice, inline: true  },
                        { name: 'Time', value: data.time },
                        { name: 'Location', value: data.location },
                        { name: 'Northern Months Availability', value: data.northAvailability},
                        { name: 'Southern Months Availability', value: data.southAvailability},
                        { name: 'Shadow', value: data.shadow, inline: true  },
                        { name: 'Rarity', value: data.rarity, inline: true  },
                    )
                    .setImage(`https://acnhapi.com/v1/images/${command}/${args}`)
                    .setFooter('Contact JL if there is a problem 🤓');
                message.channel.send(fishEmbed);
            })
    }else if (command === 'bugs'){
        request()
            .then(data => {
                const bugEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(_.capitalize(data.name))
                    .setDescription(data.phrase)
                    .setThumbnail(`https://acnhapi.com/v1/icons/${command}/${args}`)
                    .addFields(
                        { name: 'Name', value: _.capitalize(data.name) },
                        { name: 'Price', value: data.price, inline: true  },
                        { name: 'Flick Price', value: data.flickprice, inline: true  },
                        { name: 'Time', value: data.time },
                        { name: 'Location', value: data.location },
                        { name: 'Northern Months Availability', value: data.northAvailability},
                        { name: 'Southern Months Availability', value: data.southAvailability},
                        { name: 'Rarity', value: data.rarity, inline: true  },
                    )
                    .setImage(`https://acnhapi.com/v1/images/${command}/${args}`)
                    .setFooter('Contact JL if there is a problem 🤓');
                message.channel.send(bugEmbed);
            })
    }else if (command === 'sea'){
        request()
            .then(data => {
                const seaEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(_.capitalize(data.name))
                    .setDescription(data.phrase)
                    .setThumbnail(`https://acnhapi.com/v1/icons/${command}/${args}`)
                    .addFields(
                        { name: 'Name', value: _.capitalize(data.name) },
                        { name: 'Price', value: data.price, inline: true  },
                        { name: 'Time', value: data.time },
                        { name: 'Northern Months Availability', value: data.northAvailability},
                        { name: 'Southern Months Availability', value: data.southAvailability},
                    )
                    .setImage(`https://acnhapi.com/v1/images/${command}/${args}`)
                    .setFooter('Contact JL if there is a problem 🤓');
                message.channel.send(seaEmbed);
            })
    }else if (command === 'fossils'){
        request()
            .then(data => {
                const fossilEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(_.capitalize(data.name))
                    .setDescription(data.phrase)
                    .setThumbnail(`https://acnhapi.com/v1/icons/${command}/${args}`)
                    .addFields(
                        { name: 'Name', value: _.capitalize(data.name) },
                        { name: 'Price', value: data.price, inline: true  },
                    )
                    .setImage(`https://acnhapi.com/v1/images/${command}/${args}`)
                    .setFooter('Contact JL if there is a problem 🤓');
                message.channel.send(fossilEmbed);
            })
    }
});

client.login(token).catch((error) => console.log(error));