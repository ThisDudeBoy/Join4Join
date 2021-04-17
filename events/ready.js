const Discord = require('discord.js')

module.exports = {
  execute: async(client) => {
   
    console.log(`Joins+ is connecting...`)
    client.user.setPresence({ status: "online", activity:{name: `github.com/ThisDudeBoy/Join4Join`, type: "WATCHING" }});
        setInterval(() => {
            client.user.setPresence({ status: "online", activity:{name: `github.com/ThisDudeBoy/Join4Join`, type: "WATCHING" }});
        }, 60000*60);
		

  } 
}
