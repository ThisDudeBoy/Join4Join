const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: "orderdelete",
  aliases: ["delorders", "del"],
  description: "delete cmd",
  execute: async(client, message, args, db) => {
    let onwerId = config.OwnerID;

    if(!onwerId.includes(message.author.id)) return;

    let serverid = args[0]

    if(!serverid) return;

    db.delete(`code_${serverid}`)
    db.delete(`description_${serverid}`) 
    db.delete(`orders_${serverid}`)
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136') 
    .setDescription(`❎ ● <@${message.author.id}> deleted **${client.guilds.cache.get(serverid).name}** on farm command !`)
    message.channel.send(embed);
    let channelll = client.channels.cache.get("769515281658675211")
    channelll.send(embed)

} 
} 