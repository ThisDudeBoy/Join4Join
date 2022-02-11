const http = require ('http');
const express = require('express');
const app = express();
const { RichEmbed } = require("discord.js");
const config = require('./config.json');
const Discord = require('discord.js');
var cron = require('node-cron');
const client = new Discord.Client({ fetchAllMembers: false, messageCacheMaxSize: 5 }); 
const db = require('quick.db');
const fs = require('fs');
client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")); 
for (const commands of files) {
  const command = require(`./commands/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 
client.on("ready", async () => {
  const event = require('./events/ready.js').execute(client, db) 
})
client.on("message", async message => {
  let prefix = "+"
  try {
  const event = require('./events/message.js').execute(client, message, prefix, db) 
  } catch(e) {
    return message.channel.send(e.message) 
  } 
})
client.on("message", msg =>{
  const emmbed = new Discord.MessageEmbed()
    .setColor(`#2f3136`)
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription(`My current prefix is : \`${config.prefix}\`\nUse \`${config.prefix}help\` for more help.`)
    .setFooter(config.EmbedFooter)
  if(msg.content === `<@!${client.user.id}>`){
    msg.channel.send(emmbed);
  }
})
client.on("guildMemberAdd", async member => {
  const event = require('./events/guildMemberAdd.js').execute(client, member, db) 
})
client.on("guildMemberRemove", async member => {
  const event = require('./events/guildMemberRemove.js').execute(client, member, db) 
})

client.on("guildCreate", async guild => {
  console.log("Nouveau serveur!") 
  const event = require('./events/guildCreate.js').execute(client, guild) 
}) 

client.on("guildDelete", async guild => {
  console.log("Serveur quitter!") 
  const event = require('./events/guildDelete.js').execute(client, guild) 
}) 

client.on("message", async message => {
  if(message.author.bot) return;
  if (!message.guild)
  return
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)

  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5
  else if (messagefetch == 400) messages = 450; // Level 6
  else if (messagefetch == 500) messages = 500; // Level 7
  else if (messagefetch == 600) messages = 600; // Level 8
  else if (messagefetch == 700) messages = 700; // Level 9
  else if (messagefetch == 1000) messages = 1000; // Level 10

  if(messagefetch == 25) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 1**!`)
  } else if(messagefetch == 65) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 2**!`)
  } else if(messagefetch == 115) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 3**!`)
  } else if(messagefetch == 200) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 4**!`)
  } else if(messagefetch == 300) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 5**!`)
  } else if(messagefetch == 450) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 6**!`)
  } else if(messagefetch == 500) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 7**!`)
  } else if(messagefetch == 600) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 8**!`)
  } else if(messagefetch == 700) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 9**!`)
  } else if(messagefetch == 1000) {
    return message.channel.send(`> <@${message.author.id}> Votre activité sur ce serveur est **Niveau 10**! Bravo tu est au maximum`)
}
});

client.login("NDg5MDc2NjQ3NzI3ODU3Njg1.W5fOHw.OI9sSNB49LKLdm47BGhTCF8Lpb8")
