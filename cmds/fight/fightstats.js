const traitList = ["Regen","Vampire","Prodigal Son","Suicidal", "Injured", "Healthy", "Sickle Cell Anemia", "Timid", "Armored"];
const attributeList = ["Glass Cannon", "Tanky", "Gifted", "Slow", "Wildcard", "Progression "];

module.exports.getHP = () =>
{
    return parseInt(100 + Math.random()*101);
}
module.exports.getSTR = () =>
{
    return parseInt(10 + Math.random()*11);
}
module.exports.getDEF = () =>
{
    return parseInt(1 + Math.random()*10);
}
module.exports.getTRAIT = () =>
{

    return traitList[ Math.floor(Math.random() * Math.floor(traitList.length))];
}
module.exports.getNumTraits = () =>
{
    return traitList.length;
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