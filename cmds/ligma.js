module.exports.run = async (bot, message, args) => {

    var ligmaList = require('ligma.json');

    if(args == "full")
    {
        message.channel.send(ligmaList.quotes);
    }
    else
    {
        var randnum = Math.floor(Math.random() * ligmaList.quotes.length);
        message.channel.send(ligmaList.quotes[randnum]);
    }
}

module.exports.help = {
    name: "ligma",
    description: "Sends full ligma masterlist"
}