"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("mz/fs");
const ConfigOption_1 = require("./ConfigOption");
const data_1 = require("./data");
exports.config = {
    configs: {},
    setConfig(opt) {
        this.configs[opt.name] = opt;
    },
    getConfig(name) {
        if (name in this.configs) {
            return this.configs[name];
        }
        throw new Error("Could not find config");
    }
};
const defaults = JSON.parse(fs.readFileSync("./config/defaultOpts.json", "utf8"));
// add default config options
exports.config.setConfig(new ConfigOption_1.ConfigOption("prefix", defaults.prefix, val => val.toString().trim()));
exports.config.setConfig(new ConfigOption_1.ConfigOption("defaultLang", "en", undefined, val => data_1.data.langs.includes(val)));
//# sourceMappingURL=configs.js.map