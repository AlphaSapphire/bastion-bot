import * as Eris from "eris";
import { Command } from "../modules/Command";
import { generateLibraryList, libraryPages } from "../modules/libraryPages";

const names: string[] = ["p"];

async function func(msg: Eris.Message) {
    const num = /\d+/.exec(msg.content);
    if (num === null) {
        return;
    }
    const pageNumber = parseInt(num[0], 10);
    const page = libraryPages[msg.channel.id];
    const curPage = page.currentPage;
    const distance = pageNumber - curPage;
    if (distance > 0) {
        page!.forward(distance * 10);
    } else if (distance < 0) {
        page!.back(-distance * 10);
    }
    if (page.msg) {
        let out = page.msg.content;
        if (page.currentPage !== curPage) {
            out = generateLibraryList(msg.channel.id);
        }
        await page.msg.edit(out);
    }
}

function cond(msg: Eris.Message) {
    const page = libraryPages[msg.channel.id];
    return msg.channel.id in libraryPages && page !== undefined && page.userID === msg.author.id;
}

export const command = new Command(names, func, cond, undefined, true);
