const fs = require("fs");
var mergeImg = require("merge-img");
const stats = require(`./fight/fightstats`);
const sharp = require(`sharp`);
const Quote = require('inspirational-quotes');


function fight(fighter1, fighter2)
{
    if(   fighter1.hp/(fighter2.str-parseInt(Math.random()*fighter1.def))
        < fighter2.hp/(fighter1.str-parseInt(Math.random()*fighter2.def))           ) 
        return 2;
    else
        return 1;
}
function levelCheck(fighter)
{
    return (fighter.exp >= fighter.level*25)
}
function levelBonus(fighter)
{
    return(stats.chanceRoll(15, fighter.luck) && fighter.level <= 5)
}
function generateFighterWin(fighter,fighterOther)
{
    var newFighterWin = 
    {    
        user: fighter.user,
        name: fighter.name,
        waifu: fighter.waifu,
        hp: fighter.hp - parseInt(Math.random()*(fighterOther.str-fighter.def)),
        str: fighter.str,
        def: fighter.def,
        kills: fighter.kills + 1,
        level: fighter.level,
        exp: fighter.exp,
        traits: fighter.traits,
        attributes: fighter.attributes,
        traitbias: fighter.traitbias,
        attributeBias: fighter.attributeBias,
        luck: fighter.luck

    };

    return newFighterWin;
}
function generateFighterLose(fighter)
{
    var newFighterLose = stats.generateFighter("fighter", null, fighter);

    addTrait(newFighterLose);
    addAttribute(newFighterLose);

    return newFighterLose;
}
function addTrait(fighter)
{
    var kills = fighter.kills;
    if( !fighter.traits.includes("Maimed") && stats.chanceRoll(kills, -fighter.luck)   )
    {
        fighter.traits.push("Maimed");
    }
    if(stats.chanceRoll(15, fighter.traitbias) && fighter.traits.length < stats.getNumTraits())
    {
        var trait = stats.getTRAIT();
        
        while(fighter.traits.includes(trait))
        {
            trait = stats.getTRAIT();    
        }
        fighter.traits.push(trait);

        if(!fighter.traits.includes("Killer") && fighter.kills >=5 && stats.chanceRoll(50,fighter.luck))
            fighter.traits.push("Killer");
        if( (!fighter.traits.includes("Underdog") && fighter.kills < 3) && stats.chanceRoll(25,fighter.luck))
            fighter.traits.push("Underdog");
        
    }
    
}
function addAttribute(fighter)
{
    if( stats.chanceRoll(33,fighter.attributeBias)  && fighter.attributes.length < stats.getNumAttributes())
    {
        var attribute = stats.getAttribute();
        
        while(fighter.attributes.includes(attribute))
        {
            attribute = stats.getAttribute();    
        }
        fighter.attributes.push(attribute);
    }
}

function execTraits(fighter)
{
    if(typeof fighter.traits !== 'undefined')
    {
        fighter.traits.forEach( (trait, i) => {
            if(trait === 'Vampire')
                fighter.hp += parseInt(Math.random()*5);
            if(trait === 'Regen')
                fighter.hp += 5;
            if(trait === 'Suicidal')
                fighter.hp -= 5 + parseInt(Math.random()*15);
            if(trait === 'Prodigal Son')
                fighter.exp += parseInt(Math.random()*15);
            if(trait === 'Injured')
            {
                fighter.hp -= 20;
                fighter.str +=1;
                if(!fighter.traits.includes(`Healthy`))
                    fighter.traits.splice(i, 1, "Healthy");
                else
                    fighter.traits.splice(i,1);
                
            }
            if(trait === 'Healthy')
                fighter.hp += 2;
            if(trait === "Sickle Cell Anemia")
                fighter.hp -= 2;
            if(trait === "Timid" && fighter.exp >=20)
            {
                if(stats.chanceRoll(25, 0))
                    fighter.str--;
            }
            if(trait === "Armored")
                if(stats.chanceRoll(5,fighter.luck))
                    fighter.def++;
            if(trait === "Killer")
                fighter.hp += parseInt(Math.random()*fighter.level);
            if(trait === "Maimed")
                if(fighter.str > 10)
                    fighter.str-=10;
            if(trait === "Underdog" && fighter.kills < 5)
                fighter.str++;
        });
    }
}
function execAttributes(fighter)
{
    fighter.attributes.forEach( (attribute, i) => {

        if(attribute == "Glass Cannon")
        {
            fighter.str+= parseInt(Math.random() * 5);
            fighter.hp-=20;
        }
        if(attribute == "Tanky")
        {
            if(stats.chanceRoll(50, -1*fighter.luck))
                fighter.str--;
            fighter.hp+=5;
        }
        if(attribute == "Gifted")
        {
            if(stats.chanceRoll(33,fighter.luck))
                fighter.str++;
            fighter.hp+=5;
        }
        if(attribute == "Slow")
        {
            if(stats.chanceRoll(10,-1*fighter.luck))
            {
                fighter.str--;
                fighter.hp -=5;
            }
        }
        if(attribute === "Wildcard")
        {
            fighter.hp = parseInt(Math.random()*600 +1);
            fighter.str = parseInt(Math.random()*60 +1);
            if(fighter.kills > 4)
            {
                fighter.hp+=50;
                fighter.str+=5;
            }
        }
        if(attribute.indexOf("Progression ") >= 0 )
        {
                let str = attribute.substring( attribute.indexOf(" ")+1);

                let progNum = Number(str) +1;
                fighter.exp += parseInt(progNum);
                fighter.attributes.splice(i,1,`Progression ${progNum}`);
        }
        if(attribute === "Multi-faceted")
        {
            if(stats.chanceRoll(fighter.attributeBias, fighter.luck))
                addAttribute(fighter);
        }

    });
}

function getFighters()
{
    return fs.readFileSync('./cmds/fight/fightIndex.json', `utf8`, function (err, data)
    {
        if (err)
        {
            console.log(err);
        } 
    });
}
module.exports.run = async (bot, message, args) => 
{
    
    var file = JSON.parse(getFighters());
    
    var index1 = Math.floor(Math.random() * Math.floor(file.fighters.length));
    var index2 = Math.floor(Math.random() * Math.floor(file.fighters.length));

    var fighter1 = file.fighters[index1];
    var fighter2 = file.fighters[index2];

    while(index1 == index2)
    {       index2 = Math.floor(Math.random() * Math.floor(file.fighters.length));
            fighter2 = file.fighters[index2];
    }
    
    const image1 = await sharp(fighter1.waifu)
        .resize(1500,1000, { fit: 'inside', withoutEnlargement: false })
        .toFormat('png')
        .toBuffer()
        
    const image2 = await sharp(fighter2.waifu)
        .resize(1500,1000, { fit: 'inside', withoutEnlargement: false })
        .toFormat('png')
        .toBuffer()
        
    
    if(stats.chanceRoll(10, fighter1.luck))
    {
        execTraits(fighter1);
        execAttributes(fighter1);
    }

    if(stats.chanceRoll(10, fighter2.luck))
    {
        execTraits(fighter2);
        execAttributes(fighter2);
    }

    var result = fight(fighter1, fighter2);
    var winner="";

    if(result == 1)
        winner = fighter1.name;
    else if(result == 2)
        winner = fighter2.name;


    const embed =  
    {
        color: 3447003, 
        title: `Fight!`,
        description: 
        `***${fighter1.name}***\n`+
        stats.fighterToString(fighter1) +
        `\nvs. \n\n` +
        `***${fighter2.name}***\n`+ 
        stats.fighterToString(fighter2) + 
        `\nWinner: **${winner}**
        ${Quote.getRandomQuote()}`,

        file: './output/fight/outFight.png'
        
    };
    
    mergeImg([image1, `./output/fight/vs.png`, image2])
    .then((img) => {
        img.write('./output/fight/outFight.png', () => message.channel.send({embed: embed}));
        })
        
    .catch(err => {
        console.error(err);
    });

    if(result === 2)
    {   
        fighter2.exp = fighter2.exp + fighter1.str;
        if(levelCheck(fighter2))
        {
            fighter2.level = fighter2.level + 1;
            fighter2.str = fighter2.str + 1;
            addTrait(fighter2);
        }
        if(levelBonus(fighter2))
        {
            fighter2.hp = fighter2.hp + 20;
            addTrait(fighter2);

        }

        execTraits(fighter2);
        execAttributes(fighter2);

        //reassign
        file.fighters[index2] = generateFighterWin(fighter2, fighter1);
        file.fighters[index1] = generateFighterLose(fighter1);
    }
    if(result === 1)
    {
        fighter1.exp = fighter1.exp + fighter2.str;
        if(levelCheck(fighter1))
        {
            fighter1.level = fighter1.level + 1;
            fighter1.str = fighter1.str + 1;
            addTrait(fighter1);
        }
        if(levelBonus(fighter1))
        {
            fighter1.hp = fighter1.hp + 20;
            addTrait(fighter1);
        }

        execTraits(fighter1);
        execAttributes(fighter1);


        //reassign
        file.fighters[index1] = generateFighterWin(fighter1, fighter2);
        file.fighters[index2] = generateFighterLose(fighter2);
    }

    var json = JSON.stringify(file, null, '\t'); 
    fs.writeFileSync('./cmds/fight/fightIndex.json', json);
  

}

module.exports.help = {
    name: "fightsim",
    description: "Initiates a fight between two members in the server that have fighters. Use arg me to fight using your fighter"
}