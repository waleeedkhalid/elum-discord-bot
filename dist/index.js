"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const dotenv_1 = require("dotenv");
require("reflect-metadata");
(0, dotenv_1.config)();
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const discord_js_1 = require("discord.js");
const typeorm_1 = require("typeorm");
const Ticket_1 = require("./entities/Ticket");
const ticket_1 = __importDefault(require("./handlers/ticket"));
const types_1 = require("./types");
const buttonhandler_1 = __importDefault(require("./handlers/buttonhandler"));
const fs_1 = __importDefault(require("fs"));
const setrolehandler_1 = __importDefault(require("./handlers/setrolehandler"));
const client = new discord_js_1.Client({ intents: 13827 });
const token = process.env.CLIENT_TOKEN;
const rest = new rest_1.REST({ version: '9' }).setToken(token);
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const connectdb = yield (0, typeorm_1.createConnection)({
            type: 'mysql',
            host: process.env.MySQL_HOST,
            username: process.env.MySQL_USER,
            password: process.env.MySQL_PASS,
            port: 3306,
            database: process.env.MySQL_DB,
            synchronize: true,
            entities: [Ticket_1.Tickets],
        });
        console.log(connectdb ? `Connected!` : 'Error While Connect to DB!');
        client.login(process.env.CLIENT_TOKEN);
        const commands = [];
        const commandFiles = fs_1.default.readdirSync(`${__dirname + "/commands"}`).filter(f => f.endsWith('.ts'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            console.log(command);
            commands.push(command.data.toJSON());
            (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(command.data.name, command);
        }
        console.log(commands);
        try {
            console.log('Started refreshing application (/) commands.');
            yield rest.put(v9_1.Routes.applicationCommands('469928618206953484'), { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (err) {
            console.log(err);
        }
    });
}
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username}#${(_b = client.user) === null || _b === void 0 ? void 0 : _b.discriminator} is Online!`);
}));
main();
client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand())
        client.emit(types_1.CUSTOM_EVENT.COMMAND_INTERACTION, interaction);
    if (interaction.isButton())
        client.emit(types_1.CUSTOM_EVENT.BUTTON_INTERACTION, interaction);
});
client.on(types_1.CUSTOM_EVENT.COMMAND_INTERACTION, ticket_1.default);
client.on(types_1.CUSTOM_EVENT.COMMAND_INTERACTION, setrolehandler_1.default);
client.on(types_1.CUSTOM_EVENT.BUTTON_INTERACTION, buttonhandler_1.default);
