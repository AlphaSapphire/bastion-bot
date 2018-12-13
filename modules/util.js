"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Eris = __importStar(require("eris"));
const configs_1 = require("./configs");
const data_1 = require("./data");
function trimMsg(msg) {
    const m = msg instanceof Eris.Message ? msg.content : msg;
    return m
        .trim()
        .split(/ +/)
        .slice(1)
        .join(" ");
}
exports.trimMsg = trimMsg;
exports.getGuildFromMsg = (msg) => msg.channel instanceof Eris.TextChannel ? msg.channel.guild : undefined;
function getLang(msg, query) {
    const content = query || trimMsg(msg);
    const terms = content.split(",");
    if (data_1.data.langs.includes(terms[terms.length - 1])) {
        if (data_1.data.langs.includes(terms[terms.length - 2])) {
            const outM = terms.slice(0, terms.length - 2).join(",");
            return {
                lang1: terms[terms.length - 2],
                lang2: terms[terms.length - 1],
                msg: outM
            };
        }
        else {
            const outM = terms.slice(0, terms.length - 1).join(",");
            return {
                lang1: terms[terms.length - 1],
                lang2: terms[terms.length - 1],
                msg: outM
            };
        }
    }
    else {
        const defLang = configs_1.config.getConfig("defaultLang").getValue(msg);
        return {
            lang1: defLang,
            lang2: defLang,
            msg: content
        };
    }
}
exports.getLang = getLang;
function isILangPayload(arg) {
    return arg.msg !== undefined;
}
//# sourceMappingURL=util.js.map