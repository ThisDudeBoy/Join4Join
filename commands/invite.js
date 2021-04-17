const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports = {
  name: "add",
  aliases: ["invite", "link", "invites", "invs"],
  description: "add joins+.",
  execute: async(client, message) => {
   
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setThumbnail(client.user.avatarURL())
    .addField('Invite the bot',`You can add me to your server by clicking [here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1).`)    
    .setFooter(config.EmbedFooter)
    .setColor("#2f3136")
    message.channel.send(embed)
      
    
  } 
}