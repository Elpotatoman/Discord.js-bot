const traitList = ["Regen","Vampire","Suicidal","Prodigal Son"];

module.exports.getHP = () =>
{
    return parseInt(100 + Math.random()*101);
}
module.exports.getSTR = () =>
{
    return parseInt(10 + Math.random()*11);
}
module.exports.getTRAIT = () =>
{

    return traitList[ Math.floor(Math.random() * Math.floor(traitList.length))];
}
module.exports.getNumTraits = () =>
{
    return traitList.length;
}