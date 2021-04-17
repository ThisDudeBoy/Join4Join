const Discord = require('discord.js');
const config = require('../config.json');
const { get } = require('../constructors/sqlite.js');
module.exports = {
  name: "addbal",
  aliases: ["addcoins", "addcoin"],
  description: "add coins",
  execute: async(client, message, args, data, db) => {
//
    let owners = config.OwnerID;

    //let data = await get(member, member.user)

    if (!owners.includes(message.author.id)) return

    let pay = Number(args[1])

    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ ● Syntax error, please try again by doing : **${config.prefix}addbal <member> <coins>**`)
    .setColor('#2f3136')
    if (!pay || isNaN(pay)) return message.channel.send(embeded)

    let user = message.mentions.users.first()
    let logchannel = client.channels.cache.get("769515281658675211")
    let embed = new Discord.MessageEmbed()
    .setTitle('Joins+ | Logs (AddBal Command)')
    .setDescription(`**User: <@${message.author.id}>**, just added **${pay}** coins to <@${user.id}>`)
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: "png", dynamic: true }))
    let embedede = new Discord.MessageEmbed()
    .setDescription(`✔️ ● **User: <@${user.id}>**, just received successfully **${pay}** coins.`)
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: "png", dynamic: true }))
    message.channel.send(embedede)
    logchannel.send(embed)
    db.add(`coins_${user.id}`, pay)
    data.logs.unshift(`[+${pay}] - Coins given by an administrator.`)
    db.set(`logs_${user.id}`, data.logs)

  }
}
