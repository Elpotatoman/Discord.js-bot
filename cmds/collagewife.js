const fs = require('fs');
const mergeImg = require('merge-img');


module.exports.run = async (bot, message, args) => {
    
    var imgList = [];

    for(i = 0; i < 15; i++)
    {
        var randImg = Math.floor(Math.random() * Math.floor(200000))
        var link = "https://www.thiswaifudoesnotexist.net/example-" + randImg + ".jpg";
        imgList.push(link);
    }

    mergeImg(imgList, 'center')
  .then((img) => {
    // Save image as file
    
    img.write('./output/outCollageWife.jpeg', () => console.log('done'));
    message.channel.send("Collage", {files: ['./output/outCollageWife.jpeg']} )
  });

}

module.exports.help = {
    name: "collagewife",
    description: "Wife collage."
}