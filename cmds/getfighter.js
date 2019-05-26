const fs = require("fs");
const stats = require("./fight/fightstats")

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

        file.fighters.forEach((fighter, i) => {
            if(`${message.author}` === fighter.user)
            {
                embed =  
                {
                    color: 3447003,
                    title: `${fighter.name}`,
                    description: stats.fighterToString(fighter),
                    file: fighter.waifu
                };
            }

        });
        message.channel.send({embed: embed})
    });
}

module.exports.help = {
    name: "getfighter",
    description: "Shows the user's fighter if it exists without changing it."
}