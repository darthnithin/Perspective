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
		message.channel.send('Pong.');
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
    if (message.content.startsWith('>rate ',0)) {
        const cont = message.content.substring('>rate '.length,message.content.length);

        (async () => {
            let text = cont;
            const result = await perspective.analyze(text);
            let res = JSON.stringify(result, null, 2);
            score = result.attributeScores.TOXICITY.summaryScore.value;
            let pre = String(round(score, 2))
            let rounded = pre.substring(2, pre.length)
            console.log(score);
            message.reply(rounded + '%')
          })();
    }
    if(message.content && (message.channel.id == '808915103717785630' || message.channel.id == '784278934971088911')  && !message.author.bot && !message.content.startsWith('>rate ',0) && message.content != '') {
        (async () => {
            try{ 
                let text = message.content
                const result = await perspective.analyze(text);
                let res = JSON.stringify(result, null, 2);
                let score = result.attributeScores.TOXICITY.summaryScore.value;
                let pre = String(round(score, 2));
                let rounded = pre.substring(2, pre.length);
                
                if(score >= 0.9) {
                    message.reply(rounded + '%');
                    console.log(message.author.username + ': ' + message.content + " | score: " + score);
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