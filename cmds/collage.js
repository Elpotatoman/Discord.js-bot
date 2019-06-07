const collage = require("@settlin/collage")
const fs = require("fs");

module.exports.run = async (bot, message, args) => 
{

    var list = [];
    var fileList = fs.readdirSync('./waifu/');
    fileList.forEach(function (file) {
        list.push(file);
    });
    var myfiles = [];

    for(i = 0; i < 9; i++)
    {
      myfiles.push( `./waifu/${list[parseInt(Math.random()*list.length)].toString()}`);
    }


    const options = {
    sources: myfiles,
    width: 3, // number of images per row
    height: 3, // number of images per column
    imageWidth: 1000, // width of each image
    imageHeight: 1000, // height of each image
    backgroundColor: "#cccccc", // optional, defaults to #eeeeee.
    spacing: 2, // optional: pixels between each image
    lines: [
    ],
    //text: "Sometimes we want to find out when a single one time event has finished. For example - a stream is done. For this we can use new Promise. Note that this option should be considered only if automatic conversion isn't possible.Note that promises model a single value through time, they only resolve once - so while they're a good fit for a single event, they are not recommended for multiple event APIs."
    //textStyle: {color: "#fff", fontSize: 20, font: "Arial", height: 300}
    // we can use either lines or text
    };

    collage(options)
    .then((canvas) => {
      const src = canvas.jpegStream();
      message.channel.send({files: [canvas.toBuffer()]});

    });
}

module.exports.help = {
    name: "collage",
    description: "College recoded."
}