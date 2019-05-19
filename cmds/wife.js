module.exports.run = async (bot, message, args) => {
    
    var randImg = Math.floor(Math.random() * Math.floor(200000))
    var link = "https://www.thiswaifudoesnotexist.net/example-" + randImg + ".jpg";
    message.channel.send("The future: ", {files: [link]} );

}

module.exports.help = {
    name: "wife",
    description: "Random waifu from https://www.thiswaifudoesnotexist.net"
}