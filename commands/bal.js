const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json');
module.exports = {
  name: "money",
  aliases: ["bal", "balance"], 
  description: "log of coins",
  execute: async(client, message, args, data, db) => {
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || message.author
    if (user.username === undefined) user = user.user
    data = await get(message, user)
    let page = Number(args[0]) 
    if (!page || isNaN(page) || page < 1) page = 1
    let obj = { min: page * 10 - 10, max: page * 10 }
    let tpages = 1
    let n = 10
    data.logs.map((x, y) => {
      if (y == 10) n += 10, tpages++
    })
    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ ● Syntax error, please try again by doing : **${config.prefix}money <page_id>**`)
    .setColor('#2f3136')
    if (page > tpages) return message.channel.send(embeded)
    let logs = []
    data.logs.map((x, y) => {
      if (y >= obj.min && y < obj.max) logs.push(x)
    }) 

    let embed = new Discord.MessageEmbed()
    .setTitle("Money Command ✅")
    .setAuthor("Joins+", client.user.displayAvatarURL())
    .setDescription(`Hello ${user.username}, You have **${data.coins.toFixed(1)}** coins 💰`)
    .addField("> Joins server in `+farm` command to get more coins\n", "> Get members by buying an advertising with `+buy` command", true)
    .addField(`**__Your last transactions__**`, logs.length == 0 ? "No transaction history found !" : logs.join("\n")) 
    .setColor("#2f3136")
    .setThumbnail("https://cdn.discordapp.com/attachments/633366106530381838/768753019130478612/233-2333229_money-bag-emoji-transparent-transparent-background-money-bag.png")
    .setFooter(`Page ${page}/${tpages} | ${config.EmbedFooter}`)
    .setTimestamp();
    message.channel.send(embed)
  } 
}