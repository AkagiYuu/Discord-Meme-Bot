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
        if (message.content.includes('ôi bạn ơi')) {
            message.reply('Ôi bạn ơi! Bạn sức đề kháng kém là do bạn không chơi đồ đấy bạn ạ, nếu bạn chơi đồ vào thì là đề kháng nó khỏe nó không bao giờ bị ốm đâu bạn ạ, chơi đồ là thuốc bổ mà bạn! Bạn phải nên nhớ nhá, cái viên thuốc bình thường, cái viên thuốc ACID B1 bạn mua có 2 nghìn đc mấy viên đúng k ? Hoặc là 10 nghìn 1 viên, 10 nghìn 1 viên là ACID B1 đấy , đúng không? Thế đây những viên thuốc như viên thuốc kẹo, viên thuốc kim cương, viên thuốc vương liệm này, viên thuốc các kiểu lày thì bạn mua cái đấy vào 500 nghìn 1 viên cơ mà! Chơi cái đấy vào đề kháng nó phải cao hơn chứ bạn! Chơi cái đấy vào nhiều đề kháng mà! Bạn không chơi vào đề kháng bạn kém là phải đấy bạn ạ');
        } 
        if (message.content.includes('không làm mà đòi có ăn')) {
            message.reply('Xã hội này chỉ có làm, chịu khó, cần cù thì bù siêng năng, chỉ có nàm thì mới có ăn, những cái loại không nàm mà đòi có ăn thì ăn đầu buoi ăn cứt! Thế cho nó dễ! Xã hội này không làm thì chỉ có ăn cứt thôi. Nói thế cho nó nhanh, cho nó dễ hiểu. Còn xã hội này sống muốn người ta tôn trọng, mình phải tôn trọng người khác trước, muốn người ta quý mình, mình phải quý người ta trước');
        } 
        if (message.content.includes('bạn tốt')) {
            message.reply('Những người cho mình vay tiền lúc mình khó khăn, lúc mình khổ, lúc mình vỡ nợ, không phải là người ta ngu, không phải là người ta dại, mà chính vì những người đó mình phải nên tôn trọng, bởi vì những người đó coi mình là anh em bạn bè thì lúc mình vỡ nợ, khó khăn, khổ mới đưa tiền cho mình vay. Những người có tiền không phải người ta ngu đâu, không phải người ta thừa tiền đâu, người ta coi trọng mình hơn tiền bạc, người ta mới giúp lúc mình khó khăn, khổ.');
        } 
        if (message.content.includes('anh em tốt')) {
            message.reply('Còn anh em bạn bè chơi với nhau, có ăn thì tìm đến, có lon thì tìm đi. Những cái loại đấy là anh em mà ăn anh ối dồi ôi nhá. Đúng rồi anh em ạ. Cuộc đời là như thế mà. Cuộc sống thì không giống cuộc đời. Các bạn sống ở xã hội không ai biết trước ngày mai ai hơn ai. Giàu có số, nghèo có số. Nên đừng có ghen ghét đố kỵ, đừng có khinh thường người khác. Những người khinh thường người khác chính là tự khinh thường bản thân mình.')
        } 
        if (message.content.includes('nói xấu người khác')) {
            message.reply('Những người chơi với mình mà đi nói xấu người khác chính là tự nói xấu mình. Mình đừng có chơi với những loại, thể loại đấy. Họ đã đi nói xấu người khác trước mắt mình thì sớm hay muộn người ta cũng đi nói xấu mình trước mặt người khác. Những cái loại đấy các bạn đừng có nên chơi.')
        } 
        if (message.content.includes('anh bạn à')) {
            message.reply({ 
                files: ['./meme/Anh-Bạn-À.jpg'] 
            });
        }
        if(message.content.includes('super idol'))
        {
            message.reply({ 
                content: 'siêu thần tượng đã nở nụ cười cũng không đẹp bằng em cái nắng chói chang giữa tháng tám cũng không tỏa nắng bằng cậu nhiệt tâm 105C của cậu như từng giọt ngước thuần khiết',
                //files: ['./meme/super-idol.jpg'] 
            });
        }
        if(message.content.includes('rick roll'))
        {
            message.reply({
                content: `We're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching but you're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see`});
            /*message.reply({ 
                files: ['./meme/rick-roll.jpg'] 
            });*/
        }

    });
    
    client.login(process.env.TOKEN);
}

main()