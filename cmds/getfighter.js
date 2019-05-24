const fs = require("fs");

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
                    description: `
                    ***HP:*** *__${fighter.hp}__*
                    \n***Strength:*** *__${fighter.str}__* 
                    \n***Kills:*** *__${fighter.kills}__*
                    \n***LVL:*** *__${fighter.level}__* ***EXP:*** *__${fighter.exp}__*
                    \n***Traits:*** ${fighter.traits}
                    `,
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