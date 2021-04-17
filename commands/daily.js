const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
let cooldown = new Map();
const config = require('../config.json');

module.exports = {
  name: "daily",
  description: "Obtenez 1 Coins toutes les 2 heures.",
  execute: async(message, data, db) => {

    let time = Date.now(); 
    if(cooldown.get(message.author.id) > time)
    { 
       const erreur = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`❎ ● You have already received your daily gift, <@${message.author.id}> You will be able to claim a reward in \`2\` hours.`)
      .setFooter(config.EmbedFooter)
      message.channel.send(erreur).then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error);return;}   
    
    
    db.add(`coins_${message.author.id}`, 1) 
    
    cooldown.set(message.author.id, time + 7200000);

    data.logs.unshift(`[+1] - Daily bonus !`)
    db.set(`logs_${message.author.id}`, data.logs)

       const success = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setDescription(`❎ ● **${message.author.tag}**, You received **1** coins`)
      .setFooter(config.EmbedFooter)
      message.channel.send(success) 
  } 
   } 

