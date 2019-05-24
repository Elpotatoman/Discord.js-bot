const fs = require("fs");
const Discord = require("discord.js");
const sharp = require("sharp");

var mergeImg = require("merge-img");


module.exports.run = async (bot, message, args) => {
    
    var myfiles = [];
    var fileList = fs.readdirSync('./waifu/');
        fileList.forEach(function (file) {
        myfiles.push(file);
    });
    var img1 = Math.floor(Math.random() * Math.floor(fileList.length));        
    var img2 = Math.floor(Math.random() * Math.floor(fileList.length));
    
    
    var image1 = "./waifu/" + fileList[img1].toString();

    let promise1 = await sharp(image1)
        .resize(800,600, { fit: 'inside', withoutEnlargement: true })
        .toFormat('jpeg')
        .toBuffer()
        .then( data => {
            fs.writeFileSync(`./output/war/out1.jpeg`, data);
        })
        .catch( err => {
            console.log(err);
        })
    
    let result1 = await promise1;


    var image2 = "./waifu/" + fileList[img2].toString();
    let promise = await sharp(image2)
        .resize(800,600, { fit: 'inside', withoutEnlargement: true })
        .toFormat('jpeg')
        .toBuffer()
        .then( data => {
            fs.writeFileSync(`./output/war/out2.jpeg`, data);
        })
        .catch( err => {
            console.log(err);
        });

    let result = await promise;


    mergeImg(['./output/war/out1.jpeg','./output/war/out2.jpeg'])
  .then((img) => {
    // Save image as file
    
    img.write('./output/outWar.png', () => message.channel.send("Combatants", {files: ['./output/outWar.png']} ));
  });
    
    
    let pollEmbed = new Discord.RichEmbed()
        .setTitle("Waifu Vote")
        .setDescription("Pick your waifu's #")
    
    const first = "1⃣";
    const second = "2⃣";
    
    let pollMessage = await message.channel.send(pollEmbed);
    
    await (pollMessage).react(first);
    await (pollMessage).react(second);
    
    const filter = (reaction => reaction.emoji.name == first || reaction.emoji.name == second);
    
    
    const results = await (pollMessage).awaitReactions(filter, {time: 10000})
    
    let resultsEmbed = new Discord.RichEmbed()
    
    if ( typeof (results.get(first)) === "undefined") 
    {
        resultsEmbed
            .setTitle("Waifu Results")
            .setDescription("Who won?")
            .addField("#1: ", `0 Votes`)
            .addField("#2: ", `${results.get(second).count-1} Votes`)
    }
    else if ( typeof (results.get(second)) === "undefined") 
    {
        resultsEmbed
            .setTitle("Waifu Results")
            .setDescription("Who won?")
            .addField("#1: ", `${results.get(first).count-1} Votes`)
            .addField("#2: ", `0 Votes`)
    }
    else
    {
        resultsEmbed
            .setTitle("Waifu Results")
            .setDescription("Who won?")
            .addField("#1: ", `${results.get(first).count-1} Votes`)
            .addField("#2: ", `${results.get(second).count-1} Votes`)
    }
    
    message.channel.send(resultsEmbed);

}

module.exports.help = {
    name: "war",
    description: "Waifu war"
}