const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    
    fs.readFile('./node_modules/drinksOfAllTime.json', 'utf8', function (err, data) {
        if (err) throw err;
        data = data.replace(/\[/g, '');
        data = data.replace(/\]/g, '');
        data = data.replace(/\"/g, '');
        data = data.replace(/\,/g, '');
        data = data.replace(/\\/g, ' ');
        data = data.replace(/\:/g, '\n');
        

        message.channel.send("**Drink Masterlist:**\n" + "```" + data + "```");
    });

}

module.exports.help = {
    name: "drinkmaster",
    description: "All drinks ever."
}