const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    

    var embed = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Commands using prefix !`)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription("All commands for the meatus ratio.");

    fs.readdir(__dirname, (err, files) => {
        if(err) console.log(err);
    
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.lenth <= 0)
        {
            console.log("No commands");
            return;
        }
    
        console.log(`Loading ${jsfiles.length} commands`);
        var string = "";
        jsfiles.forEach( (f, i) => {
            let props = require(`${__dirname}/${f}`);
            
            string += props.help.name + "\n-" + props.help.description + "\n\n";
            if(string.length >180)
            {
                embed.addField(string, "-------------------------------------------------------------------------------------------------");
                string = " ";
            }
            
        });
        message.channel.send(embed);

    })
    



     

}

module.exports.help = {
    name: "help",
    description: "Gets all commands"
}