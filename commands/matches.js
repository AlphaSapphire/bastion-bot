"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ygopro_data_1 = require("ygopro-data");
const Command_1 = require("../modules/Command");
const configs_1 = require("../modules/configs");
const data_1 = require("../modules/data");
const matchPages_1 = require("../modules/matchPages");
const util_1 = require("../modules/util");
const names = ["match", "matches"];
async function func(msg, mobile) {
    const content = util_1.trimMsg(msg);
    const a = content.split("|");
    const query = a[0];
    const filterText = a[1];
    let lang = configs_1.config.getConfig("defaultLang").getValue(msg);
    if (filterText) {
        for (const term of filterText.toLowerCase().split(/ +/)) {
            if (data_1.data.langs.indexOf(term) > -1) {
                lang = term.toLowerCase();
            }
        }
    }
    const result = await data_1.data.getFuseList(query, lang);
    let cards = [];
    if (filterText) {
        const filter = new ygopro_data_1.Filter(await ygopro_data_1.Filter.parse(filterText, lang));
        cards = await filter.simpleFilter(result);
    }
    else {
        for (const c of result) {
            const card = await data_1.data.getCard(c.id);
            if (card) {
                cards.push(card);
            }
        }
    }
    return await matchPages_1.sendCardList(cards, lang, msg, "Top %s card name fuzzy searches for `" + query + "`", mobile);
}
exports.command = new Command_1.Command(names, func);
//# sourceMappingURL=matches.js.map