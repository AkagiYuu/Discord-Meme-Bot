import { Message } from 'discord.js';
import { parse as additional_parse } from './addition';
import { Pattern } from '../helper/pattern';
import { Meme } from '../meme/main';

const parse = (content: string): object | undefined => {
    if (!content.match(Pattern.Prefix)) return undefined;

    const command = content.replace(Pattern.Prefix, '').trim();

    if (command === 'help') return { content: global.Help };

    const meme_name = command.replace(/([<]@\S+[>])|(@\S+)/, '').trim();
    const meme = Meme.List[meme_name];

    if (typeof meme === 'undefined') return { content: global.Help };

    const tagged_person = command.match(Pattern.Tag);
    return {
        content: tagged_person === null? meme.message : `dm ${tagged_person}`,
        files: [meme.path],
    };
};
const reply = (message: Message, content: object | undefined) => {
    if (content === undefined) return;

    message.reply(content);
}

export const handler = (message: Message) => {
    reply(message, parse(message.content));
    reply(message, additional_parse(message.content));
};
