import * as Eris from "eris";
import { Command } from "../modules/Command";
import { data } from "../modules/data";
import { getLang } from "../modules/util";

const names = ["id", "code", "passcode"];
const func = async (msg: Eris.Message) => {
    const langs = getLang(msg);
    const card = await data.getCard(langs.msg, langs.lang1);
    if (card) {
        return await msg.channel.createMessage("**" + card.text[langs.lang2].name + "**: " + card.id);
    } else {
        return await msg.channel.createMessage("Sorry, I can't find a card for `" + langs.msg + "`!");
    }
};

export const cmd = new Command(names, func);
