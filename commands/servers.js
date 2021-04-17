const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "farm",
  description: "servers",
  aliases: ["search"],
  execute: async(client, message, args, data, db) => {
   
    let orders = await db.startsWith(`orders_`, { sort: ".data" })
    
    let length = 2
    
    orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(message.author.id) === undefined)
    
    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor('Joins+ | Farming', client.user.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setDescription(`Join these servers to earn 1 coin per server\n\n**__Servers to join to receive coins__**`)
    for (let i = 0;i < orders.length;i++) {
     
      let handler = true
      
     if (length > 5) {} else {

       let id = orders[i].ID.split("_")[1]
     
       let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name
     
        let code = await db.fetch(`code_${id}`)
     
       
        await client.fetchInvite("https://discord.gg/" + code)
       .then(link => { 
        console.log(link.code)
         if (link.code === null) handler = false 
       })
       .catch(error => {
         handler = false 
       }) 
       
       await new Promise(resolve => setTimeout(resolve, 1))
       
       if (handler) {
         let description = await db.fetch(`description_${id}`)
         embed.addField(`**${guild}**`, description, false)
          length++
     } 
   } 
 } 

 embed.addField(`**__Joins+ | Support__**`, `https://github.com/ThisDudeBoy/Join4Join`, false)
    
    embed.addField(`__There is no link available ?__`, `Join our support server for more coins ! [Joins+ | Github](https://github.com/ThisDudeBoy/Join4Join)`, false)
    .setFooter(config.EmbedFooter)
    message.channel.send(embed)  
  } 
}