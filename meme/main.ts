import { readFileSync } from 'fs';

export interface MemeInfo {
    [key: string]: { message: string; path: string };
}
export class Meme {
    private static _List: MemeInfo;
    public static get List(): MemeInfo {
        return this._List;
    }
    public static set List(v: MemeInfo) {
        this._List = v;
        global.Help = Object.keys(this._List).reduce(
            (help, meme) => `${help}${meme}, `,
            'Help: '
        );
    }
    public static Initialize() {
        this.List = JSON.parse(readFileSync('./meme/list.json', 'utf8'));
    }
}
