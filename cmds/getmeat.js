module.exports.run = async (bot, message, args) => {
    
    var meatsize = Math.floor(Math.random() * 1000);
    var meatus = "```8";
    var i;
    if (args.length > 0) {
        meatsize = meatsize * 2;
    }


    for (i = 0; i < meatsize; i++)
    {
        meatus += "=";
    }
    meatus += "D```";

    message.channel.send(message.author + "'s meatus is " + "**" + meatsize + "**" + " meatus units.");
    message.channel.send(meatus);

}

module.exports.help = {
    name: "getmeat",
    description: "Sends a meatus of random length, you may multiply this length with a parameter"
}