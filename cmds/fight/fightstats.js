const request = require("request");
const stats = require(`./fightstats`);
const fs = require("fs");

const traitList = ["Regen","Vampire","Prodigal Son","Suicidal", "Injured", "Healthy", "Sickle Cell Anemia", "Timid", "Armored"];
const attributeList = ["Glass Cannon", "Tanky", "Gifted", "Slow", "Wildcard", "Progression ", "Multi-faceted"];
const traitsHidden = ["Killer", "Underdog", "Maimed"]

module.exports.getHP = () =>
{
    return parseInt(100 + Math.random()*101);
}
module.exports.getSTR = () =>
{
    return parseInt(10 + Math.random()*11);
}
module.exports.getWaifu = () =>
{
    var myfiles = [];
    var fileList = fs.readdirSync('./waifu/');
    fileList.forEach(function (file) {
        myfiles.push(file);
    });
    var img = Math.floor(Math.random() * Math.floor(fileList.length));

    return `./waifu/${fileList[img]}`;
}
module.exports.getDEF = () =>
{
    return parseInt(1 + Math.random()*6);
}
module.exports.getTBIAS = () =>
{
    return Math.round(Math.random() * 20)/100;
}
module.exports.getABIAS = () =>
{
    return Math.round(Math.random() * 20 )/100;
}
module.exports.getLUCK = () =>
{
    return Math.round(Math.random() * 15 )/100;
}
module.exports.getTRAIT = () =>
{

    return traitList[ Math.floor(Math.random() * Math.floor(traitList.length))];
}
module.exports.getNumTraits = () =>
{
    return traitList.length + traitsHidden.length;
}
module.exports.getAttribute = () =>
{
    return attributeList[ Math.floor(Math.random() * Math.floor(attributeList.length))];
}
module.exports.getNumAttributes = () =>
{
    return attributeList.length;
}
module.exports.fighterToString = (fighter) =>
{
    return ` 
    HP: *${fighter.hp}*
    Strength: *${fighter.str}*
    Defense: *${fighter.def}* 
    Kills: *${fighter.kills}*
    LVL: *${fighter.level}*    EXP: *${fighter.exp}*
    Traits: ${fighter.traits}
    Attributes: ${fighter.attributes}
    `;
}  
module.exports.chanceRoll = (percent, alter) =>
{
    return (Math.random() < (percent/100.0 + alter) );
}
 


module.exports.generateFighter = (type, message, fighter) =>
{   
    var newFighter = 
    {
        user: "",
        name: "",
        waifu: stats.getWaifu(),
        hp: stats.getHP(),
        str: stats.getSTR(),
        def: stats.getDEF(),
        kills : 0,
        level : 0,
        exp: 0,
        traits: [],
        attributes: [],
        traitbias: stats.getTBIAS(),
        attributeBias: stats.getABIAS(),
        luck: stats.getLUCK()
    }

    if( type === "fighter")
    {    
        newFighter.user = fighter.user;
        newFighter.name = fighter.name;
    }
    else if (type === "message")
    {
        newFighter.user = `${message.author}`;
        newFighter.name =  message.author.username;    
    }

    return newFighter;
}

/*module.exports.getQuote = async () =>
{

        return new Promise(
            function (resolve, reject) 
            {       request('https://api.kanye.rest/', {json : true}, (err, res, body) => {
                        if(err) {return console.log(err)};
                        resolve(body.quote)
                    }) 
            });
          
}*/