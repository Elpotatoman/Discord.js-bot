const request = require("request");

module.exports.run = async (bot, message, args) => {

    var randUrl = Math.floor(Math.random() * Math.floor(3498308))
    var link = 'https://danbooru.donmai.us/posts/' + randUrl;


    request(link, {json : true}, (err, res, body) => {
        if(err) {throw console.log(err)};
        if(body.file_url !== undefined )
        {
            
                message.channel.send("Por Favor: ", {files: [body.file_url]});
            

        }
    
    });
}

module.exports.help = {
    name: "an",
    description: "Pulls from anime image board"
}