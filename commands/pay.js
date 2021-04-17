const Discord = require('discord.js');
const { get } = require('../constructors/sqlite.js');
const config = require('../config.json');
module.exports = {
  name: "pay",
  aliases: [],
  description: "pay coins",
  execute: async(client, message, args, data, db) => {
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "+";

    let amount = args.filter(x => !x.startsWith("<@"))[0]

    
    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ ● Syntax error, please try again by doing : **${config.prefix}pay <@770410190151483413> 10**`)
    .setColor('#2f3136')
    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(embeded)

    let user = message.mentions.users.first()


    /*-------------------------------------------------------------------------*/
    let errorembed = new Discord.MessageEmbed()
    .setDescription(`❎ ● Hello <@${message.author.id}>, You don't have **${amount}** coins !`)
    .setColor(`#2f3136`)
    .setTimestamp()
    .setFooter(config.EmbedFooter)
    /*-------------------------------------------------------------------------*/
    let minimumbruh = new Discord.MessageEmbed()
    .setTimestamp()
    .setDescription(`❎ ● Hello <@${message.author.id}>, The minimum payment is **10** coins !`)
    .setColor(`#2f3136`)
    .setFooter(config.EmbedFooter)
    /*-------------------------------------------------------------------------*/
    let thisisbotbruh = new Discord.MessageEmbed()
    .setTimestamp()
    .setDescription(`❎ ● Hello <@${message.author.id}>, You cannot send coins to a **bot** !`)
    .setColor(`#2f3136`)
    .setFooter(config.EmbedFooter)
    /*-------------------------------------------------------------------------*/
    let youcantpay = new Discord.MessageEmbed()
    .setTimestamp()
    .setDescription(`❎ ● Hello <@${message.author.id}>, You cannot send DiscordCoins to **yourself** !`)
    .setColor(`#2f3136`)
    .setFooter(config.EmbedFooter)
    /*-------------------------------------------------------------------------*/

    if (data.coins < Number(amount)) return message.channel.send(errorembed)

    if (Number(amount) < 10) return message.channel.send(minimumbruh)

    if (user.id === message.author.id) return message.channel.send(youcantpay)

    if (user.bot) return message.channel.send(thisisbotbruh)

    /*-------------------------------------------------------------------------*/

    let paidDMembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Pay command')
    .setDescription(`Hello <@${message.author.id}>, You sent **${amount}** coins to <@${user.id}> !`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
    .setTimestamp()
    message.channel.send(paidDMembed)

    /*-------------------------------------------------------------------------*/
        // message.channel.send(`Vous avez payé **${amount}** coins ! à ${user}`)
    /*-------------------------------------------------------------------------*/
    let paidembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Vous avez des DiscordCoins!')
    .setDescription(`<@${message.author.id}> vous a envoyé **${amount}** coins !`)
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
    .setTimestamp()
    user.send(paidembed)
    /*-------------------------------------------------------------------------*/

    data.logs.unshift(`[-${amount}] - You paid ${user.tag}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.subtract(`coins_${message.author.id}`, Number(amount))

    data = await get(message, user)

    data.logs.unshift(`[+${amount}] - ${message.author.tag} paid you.`)

    db.set(`logs_${user.id}`, data.logs)

    db.add(`coins_${user.id}`, Number(amount))
    
    let logchannel = client.channels.cache.get(`769515281658675211`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Coins sent')
    .setDescription(`Coins paid by: **${message.author.tag} (${message.author.id})**\nCoins paid at: **${user.tag} (${user.id})**\nTotal: **${amount}** coins!`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTimestamp()
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    logchannel.send(embed)
    
  }
}