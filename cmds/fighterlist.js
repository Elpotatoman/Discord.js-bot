const fs = require("fs");
const discord = require(`discord.js`);
const stats = require("./fight/fightstats");

module.exports.run = async (bot, message, args) => {
    
    fs.readFile('./cmds/fight/fightIndex.json', `utf8`, function (err, data)
    {
        if (err)
        {
            console.log(err);
        } 
    
        file = JSON.parse(data);
        var embed = {
            title: "no fighter"
        }
        var embed = new discord.RichEmbed()         
            .setColor(3447003)
            .setTitle(`Fighter List`)
            .setDescription(`
            All Fighters
                            `);
        

        file.fighters.forEach((fighter, i) => {
            embed.addField(`${fighter.name}`, 
            stats.fighterToString(fighter)
            );
            
        });
        message.channel.send({embed: embed})
    });
}

module.exports.help = {
    name: "fighterlist",
    description: "Displays a list of all fighters' stats"
}