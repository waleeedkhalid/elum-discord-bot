"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Helps you to interaction with Tickets: Create, list')
        .addStringOption(option => option.setName('type')
        .setDescription('Please select a type for your ticket')
        .addChoice('Send an embed to Creates Tickets', 'send')
        .setRequired(true))
};
