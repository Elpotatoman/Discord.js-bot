const fs = require("fs");
const getFighter = require("./getfighter");
const stats = require(`./fight/fightstats`);

function getWaifu()
{
    var myfiles = [];
        var fileList = fs.readdirSync('./waifu/');
        fileList.forEach(function (file) {
            myfiles.push(file);
        });
        var img = Math.floor(Math.random() * Math.floor(fileList.length));

        return `./waifu/${fileList[img]}`;
}

function generateFighter(message)
{
    var newFighter = 
    {
        user: `${message.author}`,
        name: message.author.username,
        waifu: getWaifu(),
        hp: stats.getHP(),
        str: stats.getSTR(),
        def: stats.getDEF(),
        kills: 0,
        level: 0,
        exp: 0,
        traits: [],
        attributes: []
            
    };
    if(Math.random() <= .15 && newFighter.traits.length === 0)
        newFighter.traits.push(stats.getTRAIT());

    if(Math.random() <= .15 && newFighter.attributes.length === 0)
        newFighter.attributes.push(stats.getAttribute());

    return newFighter;
}

module.exports.run = async (bot, message, args) => 
{

    fs.readFile('./cmds/fight/fightIndex.json', `utf8`, function (err, data)
    {
        if (err)
        {
            console.log(err);
        } 
    
        file = JSON.parse(data); 

        if(!file.users.includes(`${message.author}`))
        {
            file.users.push(`${message.author}`);
            console.log(`User: ${message.author.username} added to fighterIndex`);
            
            file.fighters.push( generateFighter(message) );
        }
        else
        {
            var index = 0;
            file.fighters.forEach( (fighter, i ) => {
                if(fighter.user === `${message.author}`)
                    index = i;
            });

            file.fighters[index] = generateFighter(message);
        }



        var json = JSON.stringify(file); 
        fs.writeFileSync('./cmds/fight/fightIndex.json', json);
        
        getFighter.run(bot, message, args);
        });

}
module.exports.help = {
    name: "genfighter",
    description: "Generates a new fighter for the user and outputs it in chat."
}