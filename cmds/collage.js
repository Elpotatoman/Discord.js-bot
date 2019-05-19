const fs = require('fs');
const mergeImg = require('merge-img');


module.exports.run = async (bot, message, args) => {
    
    var myfiles = [];
    var fileList = fs.readdirSync('./waifu/');
    fileList.forEach(function (file) {
        myfiles.push(file);
    });
    var imgList = [];

    for(i = 0; i < 8; i++)
    {
        var num = Math.floor(Math.random() * Math.floor(fileList.length));
        var tempImg = "./waifu/" + fileList[num].toString();
        imgList.push(tempImg);
    }

    mergeImg(imgList, 'center')
  .then((img) => {
    // Save image as file
    
    img.write('./output/outCollage.jpeg', () => console.log('done'));
    message.channel.send("Collage", {files: ['./output/outCollage.jpeg']} )
  });

}

module.exports.help = {
    name: "collage",
    description: "Waifu collage."
}