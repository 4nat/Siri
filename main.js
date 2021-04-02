const Discord = require("discord.js")
const Client = new Discord.Client;
const Ytld = require("ytdl-core")
const Nekos = require("nekos.life");
const { indexOf } = require("ffmpeg-static");
const Neko = new Nekos()

require("ffmpeg-static")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

let Config = {
    Token: "ODI1Mjg4OTU5ODYwMjc3MjQ5.YF7wPQ.p12GUwJS5oraQBBuCkhtjsDkcZs",
    Prefix: "siri "
}

function parseNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Client.on("ready", () => {
     Client.user.setPresence({
         status:"dnd",
         activity: {
             name: "iTunes",
             type: "LISTENING"
         }
     })
     console.log("[LOG] Siri is started!")
})

Client.on("guildMemberAdd", function(member) {
    const guild = Client.guilds.cache.get("826497959604387861")
    const channel = guild.channels.cache.get("826507881972760626")
    channel.send("<@" + member.id + ">, ")
    const embed = new Discord.MessageEmbed()
    .setTitle("Welcome, " + member.user.username)
    .addField("» Created: ", member.user.createdAt.toDateString(), false)
    .addField("» Joined: ", member.joinedAt.toDateString(), false)
    .setColor("81b0db")
    .setThumbnail(member.user.displayAvatarURL())
    channel.send(embed)
})

Client.on("message", message => {
       if(message.content.startsWith(Config.Prefix) || message.content.startsWith("Siri"))
    {
let args = message.content.slice(Config.Prefix.length).split(' ');
    let command = args.shift().toLowerCase();
    const argErrorEmbed = new Discord.MessageEmbed()
    .setTitle("» Exception!")
    .setDescription("You need to put someones tag after cmd")
    .setColor("81b0db")

    switch(command)
    {
        case "pat":
            if(args[0] == null)
            {
                message.channel.send(argErrorEmbed)
            }
            else
            {
                Neko.sfw.pat().then(function(pat)
                {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("o(*°▽°*)o")
                    .setDescription("**[" + message.author.username + "](https://syndi.tk) patted [" + args[0] + "](https://syndi.tk)**")
                    .setImage(pat["url"])
                    .setColor("81b0db")
                    message.channel.send(embed)
                })
            }
            break;
        case "fuck":
            console.log(message.channel.nsfw)
            if(message.channel.nsfw)
            {
                if(args[0] == null) 
                {
                   message.channel.send(argErrorEmbed)
                    
                }
                else
                {
                    Neko.nsfw.anal().then(function(anal) {
                        let embed = new Discord.MessageEmbed()
                        .setTitle("(*￣3￣)╭")
                        .setDescription("**[" + message.author.username + "](https://syndi.tk) is doing lewd things with [" + args[0] + "](https://syndi.tk)**")
                        .setImage(anal["url"])
                        .setColor("81b0db")
                        message.channel.send(embed)
                    })
                }
            }
            else
            {
                let embed = new Discord.MessageEmbed()
                        .setTitle("» Oops!")
                        .setDescription("This is not a **NSFW** channel! <#826780268509397043>")
                        .setColor("81b0db")
                        message.channel.send(embed)
            }
            break;
        case "hug":
            if(args[0] == null)
            {
                  message.channel.send(argErrorEmbed)
            }
            else
            {
                Neko.sfw.hug().then(function(hug) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("ヾ(•ω•`)o")
                    .setDescription("**[" + message.author.username + "](https://syndi.tk) hugged [" + args[0] + "](https://syndi.tk)**")
                    .setImage(hug["url"])
                    .setColor("81b0db")
                    message.channel.send(embed)
                })
            }
            break;
        case "kiss":
            if(args[0] == null)
            {
                   message.channel.send(argErrorEmbed)
            }
            else
            {
                Neko.sfw.kiss().then(function(kiss) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
                    .setDescription("**[" + message.author.username + "](https://syndi.tk) kissed [" + args[0] + "](https://syndi.tk)**")
                    .setImage(kiss["url"])
                    .setColor("81b0db")
                    message.channel.send(embed)
                })
        
            }
            break;
        case "slap":
            if(args[0] == null)
            {
                message.channel.send(argErrorEmbed)
            }
            else
            {
                Neko.sfw.slap().then(function(slap) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("(づ￣ 3￣)づ")
                    .setDescription("**[" + message.author.username + "](https://syndi.tk) slapped [" + args[0] + "](https://syndi.tk)**")
                    .setImage(slap["url"])
                    .setColor("81b0db")
                    message.channel.send(embed)
                })
            }
        case "play":
            function Play(connection, url, callback) {
                Ytld.getBasicInfo(url).then(function(videoInfo) {
                    var Info = { "Title": videoInfo.videoDetails.title, "Likes": videoInfo.videoDetails.likes, "Dislikes": videoInfo.videoDetails.dislikes, "Views":videoInfo.videoDetails.viewCount }
                    callback(JSON.stringify(Info))
                })
                
                connection.play(Ytld(url, {filter:"audioonly"})).on("finish", () => {
                          Play(connection, url, "123")
                })
            }
            
            const Guild = Client.guilds.cache.get("826497959604387861")
            const Member = Guild.members.cache.get(message.author.id)
            if(!Member.hasPermission("ADMINISTRATOR"))
            {
                    break;

            }
            if(args[0] == null && !args[0].startsWith("https://www.youtube.com/watch?"))
            {
                console.log(args[0])
                message.channel.send('Its not a valid YouTube address!')
            }
            else
            {
                const User = Guild.members.cache.get(message.author.id)
                if(User.voice.channel)
                {
                   message.member.voice.channel.join().then(function(connection) 
                   {
                        Play(connection, args[0], function(info) {
                            var json = JSON.parse(info)
    
    
                            const errorEmbed = new Discord.MessageEmbed()
                            .setTitle("›› Playing " + json["Title"])
                            .addField("» Views: ", parseNumber(json["Views"]), false)
                            .addField("» Likes: ", parseNumber(json["Likes"]), false)
                            .addField("» Dislikes: ", parseNumber(json["Dislikes"]), false)
                            .setColor("81b0db")
                            message.channel.send(errorEmbed)
                        })
      
                    
                   })
                }
                else
                {
                    const errorEmbed = new Discord.MessageEmbed()
                    .setTitle("›› You are not on a voice channel!")
                    .setColor("81b0db")
                    .setDescription("If you want to listen to music join a voice channel!")
                    message.channel.send(errorEmbed)
                }
            }
            break;
    }
    }
    
})
Client.login(Config.Token)
