const Discord = require('discord.js');
const ms = require('parse-ms');
const config = require('../config.json');
module.exports = {
  name: "stats",
  aliases: ["stats"],
  description: "",
  execute: async(client, message, args, data, db, ping) => {

    let uptime = []

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`${x[1]} ${x[0]}`)
    })


    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setTitle(`Informations about Joins+`)
    .setFooter(config.EmbedFooter)
    .setDescription(`**__Informations__**:\n**Ram:** "+(process.memoryUsage().rss / 1024 / 1024).toFixed(2)+"MB\n**Uptime:** "+uptime.join(", ")+"\n**Shards:** 2\n**Ping:** "+Math.round(client.ws.ping)+"ms\n**Discord.js:** "+Discord.version+"\n**Node.js:** "+process.versions.node+"\n\n**__Statistics:__**\n**Servers:** " +client.guilds.cache.size+"\n**Members:** " +client.users.cache.size+"\n**Channels:** " +client.channels.cache.size+"\n**Emojis:** " +client.emojis.cache.size+"\n\n**__Links__**:\n**Support Server:** [Click me](https://discord.gg/RwYusY6)\n**Github:** [Click me](https://github.com/ThisDudeBoy/Join4Join)\n**Invite:** [Click me](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=-1&scope=bot) `)
    message.channel.send(embed)
  }
}
