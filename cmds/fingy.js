module.exports.run = async (bot, message, args) => {
    
    message.channel.send("I knew all along", {files: ["./images/fingy.png"]});

}

module.exports.help = {
    name: "fingy",
    description: "Somehow"
}