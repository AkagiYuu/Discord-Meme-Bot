const { Client, Intents } = require("discord.js");
const { readFileSync } = require("fs");
require('dotenv').config();

const getRandomMeme =  memeList => {
    const keys = Object.keys(memeList);
    return keys[keys.length * Math.random() << 0];
}

function main() {
    const memeList = JSON.parse(readFileSync('./memeList.json'));
    let helpList = 'đàm meme list: ';
    Object.keys(memeList).forEach(meme => helpList += `${meme}, `);
    const client = new Client({ 
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            Intents.FLAGS.GUILDS
        ] 
    })
    
    client.on("ready", () => {
        console.log(`Log in as ${client.user.tag}`);
    })

    client.on("message", (message) => {
        if(message.content.match(/^dm.+/)) {
            console.log(message.author)
            const command = message.content.replace(/^dm.{1}/,'')
            if(command === 'help') {
                message.reply(helpList)
            } else {
                const taggedPerson = command.match(/[<]@\S+[>]/)
                let memeName = command.replace(/([<]@\S+[>])|(@\S+)/,'').trim()
                if(memeName === '') {
                    memeName = getRandomMeme(memeList)
                }
                if(typeof memeList[memeName] !== 'undefined') {
                    if(taggedPerson !== null) 
                        message.reply({
                            content: `${message.author.username} dm ${taggedPerson}`,
                            files: [memeList[memeName].path]
                        })
                    else
                        message.reply({ 
                            content: memeList[memeName].message,
                            files: [memeList[memeName].path] 
                        });
                }
            }
            
        }
    })
    
    client.login(process.env.TOKEN);
}

main()