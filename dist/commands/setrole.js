"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('setrole')
        .setDescription('setrole for users: add roles or delete')
        .addStringOption(option => option.setName('type')
        .setDescription('Please select a type for what you want')
        .addChoice('add', 'add')
        .addChoice('remove', 'remove')
        .setRequired(true))
        .addUserOption(u => u.setName('user')
        .setDescription(`Select user`)
        .setRequired(true))
        .addRoleOption(o => o.setName('role')
        .setDescription(`Select Role`)
        .setRequired(true))
};
