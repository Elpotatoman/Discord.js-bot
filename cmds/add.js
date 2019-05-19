const fs = require('fs');


module.exports.run = async (bot, message, args) => {
    
    if (args.length > 0) {
        const meme = JSON.stringify(args);

        fs.readFile('./hookup.json', 'utf8', function (err, data) {
            var json = JSON.parse(data);
            json.push(":" + meme);
            fs.writeFileSync("./hookup.json", JSON.stringify(json), function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        })

    }
}

module.exports.help = {
    name: "add",
    description: "Adds a meme to the meme master list takes 1 parameter"
}