const fs = require('fs');
const mergeImg = require('merge-img');
const sharp = require("sharp");
const path = require("path");

function removeFiles(directory)
{
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });
}

module.exports.run = async (bot, message, args) => {
    var imgEdit = [`./output/collage2/out0.jpeg`, `./output/collage2/out1.jpeg`, 
                    `./output/collage2/out2.jpeg`,`./output/collage2/out3.jpeg`, 
                    `./output/collage2/out4.jpeg`, `./output/collage2/out5.jpeg`,
                    `./output/collage2/out6.jpeg`, `./output/collage2/out7.jpeg` ];

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
    

    let promise  = await imgList.forEach( (image, i) => {

        sharp(image)
            .resize(800,600, { fit: 'inside', withoutEnlargement: true })
            .toFormat('jpeg')
            .toBuffer()
            .then( data => {
                fs.writeFileSync(`./output/collage2/out${i}.jpeg`, data);
            })
            .catch( err => {
                console.log(err);
            });
    });

    let result = await promise;
    
    mergeImg(imgEdit, 'center')
  .then((img) => {    
    img.write('./output/outCollageReborn.jpeg', () => message.channel.send("CollageReborn", {files: ['./output/outCollageReborn.jpeg']} ));
    
  });




}

module.exports.help = {
    name: "collage",
    description: "Collage reborn."
}