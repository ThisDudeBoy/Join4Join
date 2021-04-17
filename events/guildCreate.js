const Discord = require('discord.js')

module.exports = {
  execute: async(client, guild) => {
    
    let channel = client.channels.cache.get("769515281658675211")
  
    const embed = new Discord.MessageEmbed()
    .setTitle(`Joins+ a rejoint un serveur!`)
    .setColor(`#19ec1d`)
    .setDescription("Merci à **"+ guild.owner.user.tag +"** de m'avoir ajouté dans son serveur, je suis maintenant dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
    .setThumbnail(guild.iconURL())
    if (channel) channel.send(embed) 

  } 
} 