const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    fs.readFile('./hookup.json', 'utf8', function (err, data) {
        if (err) throw err;
        data = data.replace(/\[/g, '');
        data = data.replace(/\]/g, '');
        data = data.replace(/\"/g, '');
        data = data.replace(/\,/g, '');
        data = data.replace(/\\/g, ' ');
        data = data.replace(/\:/g, '\n');
        

        message.channel.send("**Meme Masterlist:**\n" + "```" + data + "```");
    });

}

module.exports.help = {
    name: "meme",
    description: "Sends all memes from meme masterlist"
}