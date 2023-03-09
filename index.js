const Discord = require('discord.js')

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Bot is online");
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(client, message, args, Discord)
    }
    else if (command === 'weather'){
        client.commands.get('weather').execute(client, message, args, Discord)
    }
})

client.login("MTA4MzAyNDk1OTcwNzgyMDA5NA.G8l8Yg.f97G_yZAkoEfb7WYEjXKucvYW5cv02ml0z4aLo");