const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js') 
const freecoins = require('../events/coins.js')
const ms = require('ms')
const parse = require('parse-ms')
const config = require('../config.json')
module.exports = {
  execute: async (client, message, prefix, db) => {
    prefix = (await db.fetch(`prefix_${message.guild.id}`)) || config.prefix;
    if (message.author.bot || message.channel.type === "dm") return
    // Maintenance Mode
    // if(!message.author.id !== "307512442617856000") return;
    
    //freecoins.execute(client, message, db)
    
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let x = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || !x) return;
    
    let command = client.commands.get(x) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(x))
    
    if (!command) return
    
    let time = Date.now() - message.author.createdTimestamp
    
    if (time < 86400000) {
      let text = []
      time = Date.now() - message.author.createdTimestamp
      time = 86400000 - time 
      Object.entries(parse(time)).map((x, y) => {
        if (x[1] > 0 && y < 4) text.push(`**${x[1]} ${x[0]}**`) 
      })
      return message.channel.send({
        embed: {
          color: 808080,
          title: `Sorry, ${message.author.username}.`,
          description: "I cannot work for users who are new to Discord.",
          fields: [
            {
              name: "You need to wait :",
              value: text.join(", ") 
            } 
          ] 
        }
      }) 
    } 
    //right now, data will be set to 0
    //since it's a lot of work and it's late for me
    let data = await get(message, message.author) 
    
    let embed1 = new Discord.MessageEmbed()
    .setTitle('❎ Ban system')
    .setDescription(`❎ - You are banned from **Joins+**`)
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter)
    if (data.banned == true && message.author.id !== "307512442617856000") return message.channel.send(embed1)
    
    try {
    command.execute(client, message, args, data, db) 
    } catch(e) {
      message.channel.send(e.message) 
    } 
  } 
} 