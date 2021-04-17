const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "order",
  aliases: ["info"],
  description: "info sustem",
  execute: async(client, message, args, data, db) => {
   
    if (data.code == 0) 
    { 
       const erreur = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`❎ ● No purchase made for this server.`)
      .setFooter(config.EmbedFooter)
      message.channel.send(erreur).then(msg => {msg.delete({ timeout: 12000 })}).catch(console.error);return;}   
    
    let bar = []
    
    let progress = data.uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10)
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`) 
    }
    
    let warn = ""
    
    await client.fetchInvite('https://discord.gg/' + data.code).catch(e => warn = "The invite link for this server has expired! Please place a new order or no one will be able to join !")
    
   const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${message.guild.name} ● Ordering Information :`)
    .setThumbnail(message.channel.guild.iconURL())
    .setDescription(`Members ordered: **${data.orders}**\nTotal members: **${data.uses}/${data.orders}**`)
    .setFooter(config.EmbedFooter)

    message.channel.send(warn, embed) 
  } 
} 