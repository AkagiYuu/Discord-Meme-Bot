import { Client, Intents } from 'discord.js';
import { handler as message_handler } from "./message_parser/main";
import { Meme } from './meme/main';
require('dotenv').config();

function main() {
    Meme.Initialize();
    const client = new Client({
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            Intents.FLAGS.GUILDS,
        ],
    });

    client.on('ready', () => {
        console.log(`Log in as ${client.user?.tag}`);
    });

    client.on("message", message_handler);

    client.login(process.env.TOKEN);
}

main();
