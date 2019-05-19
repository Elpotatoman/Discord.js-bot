module.exports.run = async (bot, message, args) => {
    message.channel.send("Looking cool hiero ", {files: ["./images/final_PAP.jpg"]});
    message.channel.send("Looking cool fool ", {files: ["./images/final_RNA.jpg"]});
    message.channel.send("Looking cool death ", {files: ["./images/final_MITO.jpg"]});
}

module.exports.help = {
    name: "callingcard",
    description: "Sends all calling cards"
}