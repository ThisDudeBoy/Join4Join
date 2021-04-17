const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "ban",
  description: "Bannir un membre d'utiliser le bot, propriétaire uniquement.",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID;
    
    if (!owners.includes(message.author.id)) return
    
    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.slice(0, user.username.split(" ").length).join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()
    const membernotfound = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`❎ ● I can't find this person`)
    .setFooter(config.EmbedFooter)
    if (user === undefined) return message.channel.send(membernotfound)
    
    let reason = args.slice(1).join(" ")
    
    if (!reason) reason = `No reason`
    
    let embed1 = new Discord.MessageEmbed()
    .setTitle('❎ Ban system')
    .setDescription(`Name: **${user.username}** (\`${user.id}\`)\nReason: **${reason}**\nBanned by: <@${message.author.id}>`)
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter)
    message.channel.send(embed1)
    let bannedchannel = client.channels.cache.get('709803872557989899')
    let embed = new Discord.MessageEmbed()
    .setTitle('❎ Ban system')
    .setDescription(`Name: **${user.username}** (\`${user.id}\`)\nReason: **${reason}**\nBanned by: <@${message.author.id}>`)
    .setColor('#2f3136')
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setFooter(config.EmbedFooter)
    bannedchannel.send(embed)

    db.set(`banned_${user.id}`, true) 

  } 
}