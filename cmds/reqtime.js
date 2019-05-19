const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    var myfiles = [];
    var fileList = fs.readdirSync('./randmp3/');
    fileList.forEach(function (file) {
        myfiles.push(file);
    });
    var mp3 = Math.floor(Math.random() * Math.floor(fileList.length));

    message.channel.send("Lemme check my watch", {files: ["./randmp3/" + fileList[mp3]]});
}

module.exports.help = {
    name: "reqtime",
    description: "Sends random audio file"
}