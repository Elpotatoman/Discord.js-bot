const fs = require("fs");
var mergeImg = require("merge-img");
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

function fight(fighter1, fighter2)
{
    if(fighter1.hp/fighter2.str < fighter2.hp/fighter1.str)
        return 2;
    else
        return 1;
}
function levelCheck(fighter)
{
    return (fighter.exp >= fighter.level*30)
}
function levelBonus(fighter)
{
    return(Math.random() < .1 && fighter.level <= 5)
}
function generateFighterWin(fighter,fighterOther)
{
    let newFighter = 
    {    
        user: fighter.user,
        name: fighter.name,
        waifu: fighter.waifu,
        hp: fighter.hp - parseInt(Math.random()*fighterOther.str+1),
        str: fighter.str,
        kills: fighter.kills + 1,
        level: fighter.level,
        exp: fighter.exp,
        traits: fighter.traits

    };
    return newFighter;
}
function generateFighterLose(fighter)
{
    let newFighter =
    {
        user: fighter.user,
        name: fighter.name,
        waifu: getWaifu(),
        hp: stats.getHP(),
        str: stats.getSTR(),
        kills : 0,
        level : 0,
        exp: 0,
        traits: []
    };
    if(Math.random() <= .1)
        newFighter.traits.push(stats.getTRAIT());

    return newFighter;
}
function addTrait(fighter)
{
    if(Math.random() <= .1  && fighter.traits.length < stats.getNumTraits)
    {
        let trait = stats.getTRAIT();
        while(fighter.traits.includes(trait))
        {
            trait = stats.getTRAIT();    
        }
        fighter.traits.push(trait);
    }
}

function execTraits(fighter)
{
    if(typeof fighter.traits !== 'undefined')
    {
        fighter.traits.forEach(trait => {
            if(trait === 'Vampire')
                fighter.hp += parseInt(Math.random()*10);
            if(trait === 'Regen')
                fighter.hp += 5;
            if(trait === 'Suicidal')
                fighter.hp -= 5;
            if(trait === 'Prodigal Son')
                fighter.exp += parseInt(Math.random()*15);
        });
    }
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
        
        var index1 = Math.floor(Math.random() * Math.floor(file.fighters.length));
        var index2 = Math.floor(Math.random() * Math.floor(file.fighters.length));
        var fighter1 = file.fighters[index1];
        var fighter2 = file.fighters[index2];
        while(index1 === index2)
        {   index2 = Math.floor(Math.random() * Math.floor(file.fighters.length));
            fighter2 = file.fighters[index2];
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
            `**${fighter1.name}**:
            HP:${fighter1.hp} Strength:${fighter1.str} 
            Kills:${fighter1.kills} 
            LVL:${fighter1.level} EXP${fighter1.exp}     
            Traits: ${fighter1.traits}

            vs.

            **${fighter2.name}**:
            HP:${fighter2.hp} Strength:${fighter2.str} 
            Kills:${fighter2.kills} 
            LVL:${fighter2.level} EXP:${fighter2.exp} 
            Traits: ${fighter2.traits}
            
            Winner: **${winner}**`,

            file: './output/fight/outFight.png'
            
        };
        
        mergeImg([fighter1.waifu, `./output/fight/vs.png`, fighter2.waifu])
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
                fighter1.hp = fighter1.hp + 20;

            execTraits(fighter1);
    
            //reassign
            file.fighters[index1] = generateFighterWin(fighter1, fighter2);
            file.fighters[index2] = generateFighterLose(fighter2);
        }

        var json = JSON.stringify(file); 
        fs.writeFileSync('./cmds/fight/fightIndex.json', json);
    });   

}

module.exports.help = {
    name: "fightsim",
    description: "Initiates a fight between two members in the server that have fighters."
}