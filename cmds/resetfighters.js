const fs = require("fs");
const fighterlist = require("./fighterlist");
const stats = require(`./fight/fightstats`);


function generateFighter(fighter)
{
    var newFighter = stats.generateFighter("fighter", null, fighter);

    if(  (Math.random() <= .15 + newFighter.traitbias) && newFighter.traits.length === 0)
        newFighter.traits.push(stats.getTRAIT());

    if(  (Math.random() <= .15 + newFighter.attributeBias) && newFighter.attributes.length === 0)
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

        file.fighters.forEach( (fighter, i) => {
            file.fighters[i] = generateFighter(fighter);

        });


        var json = JSON.stringify(file, null, '\t'); 
        fs.writeFileSync('./cmds/fight/fightIndex.json', json);
        
        fighterlist.run(bot, message, args);
        });

}
module.exports.help = {
    name: "resetfighters",
    description: "Generates a new fighter for all users and outputs fighterlist command."
}