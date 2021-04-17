const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "advertise",
  aliases: ["buy"],
  description: "Utilisé pour annoncer votre serveur et obtenir des membres sur votre serveur.",
  execute: async(client, message, args, data, db) => {
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || config.prefix;

    let amount = Number(args[0])

    const description = args.slice(1).join(" ")
    let needatleastcoins = new Discord.MessageEmbed()
    .setDescription(`❎ ● Missing coins, <@${message.author.id}> You need at least \`3\` coins to buy members on your server.`)
    .setColor("#2f3136")
    .setFooter(config.EmbedFooter)
    if(amount < 3) return message.channel.send(needatleastcoins)
    if (data.coins < 3) return message.channel.send(needatleastcoins)
    let incorrectcommand = new Discord.MessageEmbed()
    .setDescription(`❎ ● Syntax error, please try again by doing : **${prefix}buy <coins> <description>**`)
    .setColor("#2f3136")

    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(incorrectcommand)

    if (amount > data.coins) return message.channel.send(needatleastcoins)

    amount = Math.round(amount)

    let link = data.code

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    let invitenotallowed = new Discord.MessageEmbed()
    .setDescription(`❎ ● Description error, please try again : **Please do not include invitation links**`)
    .setColor("#2f3136")
    let web = new Discord.MessageEmbed()
    .setDescription(`❎ ● Description error, please try again : **Please do not put website links**`)
    .setColor("#2f3136")
    let toolong = new Discord.MessageEmbed()
    .setDescription(`❎ ● Description error, please try again : **Your description exceeds 75 words**`)
    .setColor("#2f3136")
    if (description && description.includes("discord.gg")) return message.channel.send(invitenotallowed)
    if (description && description.includes("https://", "http://")) return message.channel.send(web)
    if (description && description.length > 75) return message.channel.send(toolong)
    


    await new Promise(resolve => setTimeout(resolve, 100))

    db.set(`code_${message.guild.id}`, link)

    data.logs.unshift(`[-${amount}] - Buy an advertisement for ${message.guild.name}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)

    db.add(`orders_${message.guild.id}`, amount)

    db.subtract(`coins_${message.author.id}`, amount)
    
    let successembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`Order successfully completed`)
    .setColor("#2f3136")
    .setDescription(`[<@${message.author.id}>] You have successfully purchased **${amount}** members for your server.\n You can now check the status of your order for **${client.guilds.cache.get(message.guild.id).name}** by using **+__info__**`)
    .setFooter(config.EmbedFooter)
    message.channel.send(successembed)
    let logchannel = client.channels.cache.get('769515281658675211')
    let embed = new Discord.MessageEmbed()
    .setTitle('Orders placed by a member')
    .setColor("#2f3136")
    .setFooter(config.EmbedFooter)
    .addField(`Name of server :`, `${message.guild.name}`, false)
    .addField(`ID :`, `${message.guild.id}`, false)
    .addField(`Members of buying :`, `${Number(args[0])}`, false)
    .addField(`Description :`, `${description}`, false)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    logchannel.send(embed)
  }
}