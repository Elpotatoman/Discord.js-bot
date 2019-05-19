const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {

    message.channel.send("Watch is eager");
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 15000});

    collector.on('collect', message => {
        if (message.content === "bitch") {
            message.channel.send("WATCH IS ANGRY");
        } else if (message.content === "watch") {
            message.channel.send("Watch is watching you");
        } else if (message.content === "check out this spectrological block chain decryptor") {
            message.channel.send("Watch acknowledges your skills and accepts you into the pack");
        } else if (message.content === "no") {
            message.channel.send("Watch Waverly is noticeably disheartened");
        } else if (message.content === "despacito") {
            message.channel.send("Type this brother : !play https://www.youtube.com/watch?v=kJQP7kiw5Fk");
        } else if (message.content === "cuck") {
            message.channel.send("You have broken watch");
            message.channel.send("fucking normies");
        } else if (message.content === "recover") {
            message.channel.send("You have been spared");
        } else if (message.content === "619") {
            message.channel.send("**" + message.author + " don't worry you'll get yours**");
            message.channel.send("https://www.youtube.com/watch?v=JbgSmseDb2U&t=1s")
        } else {
            request('https://api.kanye.rest/', {json : true}, (err, res, body) => {
                if(err) {return console.log(err)};
                message.channel.send(body.quote);
             });
        }
        if (message.author === message.author) collector.stop("Message Received");
    });

}

module.exports.help = {
    name: "stimulate",
    description: "Watch interaction service"
}