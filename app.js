const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

var fightsim = require('./cmds/fightsim');

var fs = require('fs');
var cumList = [];


client.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.lenth <= 0)
    {
        console.log("No commands");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach( (f, i) => {
        let props = require(`./cmds/${f}`);
        client.commands.set(props.help.name, props);
    });
});




client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Observing ${client.guilds.size} watchyh brothers`);

    var testChannel = client.channels.find(channel => channel.id === '580951775033688065');

    setInterval( () => {
        tempMessage = {channel: null};
        tempMessage.channel = testChannel;
        fightsim.run(client, tempMessage, '')
    }, 120000);
});

client.on("message", async message =>
{

    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command)
    if(cmd && message.content.substring(0,1) ===config.prefix) 
        cmd.run(client , message, args);
        
    if (message.content.substring(0,1) !== config.prefix && message.content.includes("anime"))
    {
        message.channel.send(message.author + " Nice try fucko, you're going on my cum list", {files: ["./images/watch.png"]});
        if (cumList.includes(message.author) === false) {
            cumList.push(message.author);
        }

        message.channel.send("Cumlist: " + cumList);
    }
    if (message.content.substring(0,1) !== config.prefix && message.content.includes("waifu"))
    {
        var myfiles = [];
        var fileList = fs.readdirSync('./waifu/');
        fileList.forEach(function (file) {
            myfiles.push(file);
        });
        var img1 = Math.floor(Math.random() * Math.floor(fileList.length));        
        

        message.channel.send("One waifu coming right up", {files: ["./waifu/" + fileList[img1]]});
    }
    
    
}

,client.login(config.token));


