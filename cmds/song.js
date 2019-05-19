const Lyricist = require('lyricist/node6');

module.exports.run = async (bot, message, args) => {
    
    const accessToken1 = "XPVjg4FtB_qIOG8THxfXZxaXmMQ4PsVlUj3EHX0SESh7YHgHT7JnP_MBO4FBBwhl";
    const lyricist = new Lyricist(accessToken1);
    const song = await lyricist.song(2943850, { fetchLyrics: true });
    console.log(song.title);
    message.channel.send(song.title);
    var randlength = Math.floor(Math.random() * 2500);
    message.channel.send(song.lyrics.substring(randlength, randlength+200));

  
}


module.exports.help = {
    name: "song",
    description: "Sends random lyrics by Moist Motha himself"
}