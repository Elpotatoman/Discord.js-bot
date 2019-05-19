const fs = require ("fs");
const request = require("request");
const drinksOfAllTime = require("drinksOfAllTime.json");

module.exports.run = async (bot, message, args) => {
    
    request('https://api.chew.pro/trbmb', {json : true}, (err, res, body) => {
        if(err) {return console.log(err)};
        message.channel.send(body[0]);
        fs.readFile('./node_modules/drinksOfAllTime.json', 'utf8', function (err, data) {
            var json = JSON.parse(data);
            json.push(":" + JSON.stringify(body[0]) );
            fs.writeFileSync("./node_modules/drinksOfAllTime.json", JSON.stringify(json), function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        })
     });

}

module.exports.help = {
    name: "drink",
    description: "Gets quote"
}