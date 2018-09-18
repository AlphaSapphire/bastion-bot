"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const data_1 = require("./data");
function cardSearch(msg) {
    const baseRegex = /{(.+)}/g;
    const baseResult = baseRegex.exec(msg.content);
    if (baseResult) {
        baseResult.forEach(async (res, i) => {
            // ignore full match
            if (i > 0) {
                const card = await data_1.data.getCard(res, "en");
                if (card) {
                    bot_1.bot.createMessage(msg.channel.id, generateCardProfile(card));
                }
            }
        });
    }
    /*const imageRegex = /<(.+)>/g;
    const imageResult = imageRegex.exec(msg.content);
    if (imageResult) {
        imageResult.forEach(async (res, i) => {
            // ignore full match
            if (i > 0) {
                const card = await data.getCard(res, "en");
                if (card) {
                    bot.createMessage(msg.channel.id, generateCardProfile(card, true));
                }
            }
        });
    }*/
    const mobileRegex = /\[(.+)\]/g;
    const mobileResult = mobileRegex.exec(msg.content);
    if (mobileResult) {
        mobileResult.forEach(async (res, i) => {
            // ignore full match
            if (i > 0) {
                const card = await data_1.data.getCard(res, "en");
                if (card) {
                    bot_1.bot.createMessage(msg.channel.id, generateCardProfile(card, true));
                }
            }
        });
    }
}
exports.cardSearch = cardSearch;
function generateCardProfile(card, mobile = false) {
    let stats = "";
    if (card.setNames.length > 0) {
        stats += "**Archetype**: " + card.setNames.join(", ");
    }
    stats += "\n";
    let type = "**Type**: " + card.typeNames.join("/");
    if (card.raceNames.length > 0) {
        type = type.replace("Monster", card.raceNames.join("|"));
    }
    stats += type;
    if (card.attributeNames.length > 0) {
        stats += " **Attribute**: " + card.attributeNames.join("|");
    }
    stats += "\n";
    if (card.typeNames.includes("Monster")) {
        stats += "**Level**: " + card.level + " **ATK**: " + card.atk + " **DEF**: " + card.def + "\n";
    }
    if (mobile) {
        const outString = "__**" + card.name + "**__\n**ID**: " + card.code + "\n" + stats + "**Card Text**:\n" + card.desc_m;
        return outString;
    }
    const outEmbed = {
        embed: {
            description: stats,
            fields: [
                {
                    name: "Card Text",
                    value: card.desc_m
                }
            ],
            footer: { text: card.code.toString() },
            title: card.name
        }
    };
    return outEmbed;
}
//# sourceMappingURL=cardSearch.js.map