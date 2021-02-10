require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY});

client.once('ready', () => {
	console.log('Ready!');

});

client.on('message', message => {
	if (message.content === '>ping') {
		message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);
        
	}
    else if(message.content === '>resetusername') {
        // console.log(message.guild.members)
        console.log(message.guild.member(message.author).user.username);
        //reset username
        message.guild.member(message.author).setNickname(message.guild.member(message.author).user.username)
        //delete command
        if(message.deletable) {
            message.delete({timeout: 10, reason: 'Done!'})
        }
    }
    if(message.content.includes('mute') && !message.author.bot) {
        const embed = {
            "description": "[[MUTE]](https://photricity.com/flw/ec/secure/)",
            "color": 1005317,
            "timestamp": "2021-02-10T05:14:17.904Z",
            "footer": {
              "icon_url": "https://dyno.gg/images/v3/dyno-256.jpg",
              "text": "footer text"
            },
            "author": {
              "name": "Modbot",
              "url": "https://photricity.com/flw/ec/secure/",
              "icon_url": "https://dyno.gg/images/v3/dyno-256.jpg"
            },
            "fields": []
          };
        message.channel.send({ embed })
        if(message.deletable) {
            message.delete
        }
    }
    if(message.author.id == '235148962103951360') {
        if(message.deletable) {
            message.delete
        }
    }
    try{
        if (message.content.startsWith('>rate ',0)) {
            const cont = message.content.substring('>rate '.length,message.content.length);
            
            (async () => {
                let text = cont;
                const result = await perspective.analyze(text);
                let res = JSON.stringify(result, null, 2);
                score = result.attributeScores.TOXICITY.summaryScore.value;
                let pre = String(round(score, 2))
                let rounded = pre.substring(2, pre.length)
               // console.log(score);
                message.reply(rounded + '%')
            })();
        }
    }
    catch{}
    finally{}
    if(message.content && (message.channel.id == '808915103717785630' || message.channel.id == '784278934971088911')  && !message.author.bot && message.content != '') {
        (async () => {
            try{ 
                let text = message.content
                const result = await perspective.analyze(text);
                let res = JSON.stringify(result, null, 2);
                let score = result.attributeScores.TOXICITY.summaryScore.value;
                let pre = String(round(score, 2));
                let rounded = pre.substring(2, pre.length);
                
                if(score >= 0.9) {
                    const log = message.author.username + ': ' + message.content + " | score: " + score;
                    message.reply(rounded + '%');
                    message.author.send("Hey! Your message sent in " + message.channel.name + ' in the ' + message.guild.name + 'server was Flagged 🏳. Please reply to appeal to a moderator.')
                    message.author.send(log)
                    //if(message.deletable) {
                    //    message.delete()
                    //}

                    console.log(log);
                }
            }
            catch{}
            finally{}
          })();
    }
});

client.login(process.env.TOKEN);
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
