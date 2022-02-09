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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const typeorm_1 = require("typeorm");
const Ticket_1 = require("../entities/Ticket");
function createTicketDB(channel, interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const getTicketRepo = (0, typeorm_1.getRepository)(Ticket_1.Tickets);
        const tickets = getTicketRepo.create({
            userId: interaction.user.id.toString(),
            guildId: (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.id.toString(),
            channelId: channel.id.toString(),
            status: 'pending',
        });
        return yield getTicketRepo.save(tickets);
    });
}
function createTicketChannel(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const { channels, id } = interaction.guild;
        const channelName = 'new-' + Math.random().toString().padStart(4, '0');
        return yield channels.create(channelName, {
            type: 'GUILD_TEXT',
            topic: `userId: ${interaction.user.id.toString()}`,
            permissionOverwrites: [
                {
                    id: interaction.user.id.toString(),
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: id.toString(),
                    deny: ['VIEW_CHANNEL']
                },
            ]
        });
    });
}
function editTicketChannel(channel, ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = `elum-${ticket.id.toString().padStart(4, '0')}`;
        return yield channel.edit({ name });
    });
}
function sendNotifaction(channel, interaction) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // TICKET MESSAGE
        const embd = new discord_js_1.MessageEmbed()
            .setTitle("🎫・New Ticket | تذكرة جديدة")
            .setDescription(`                   
        الرجاء الإنتظار قليلًا قبل إستدعاء الإدارة \n
        **صانع التذكرة**
        <@${interaction.user.id}>\n
        **خيارات التذكرة**
        إستدعاء الإدارة・🔔
        إغلاق التذكرة・❌
        `)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setFooter({ text: `${(_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.name} - Support System`, iconURL: `${(_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.iconURL()}` });
        yield channel.send({ embeds: [embd],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 'BUTTON',
                            style: 'PRIMARY',
                            label: 'إستدعاء الإدارة',
                            emoji: '🔔',
                            customId: 'callAdmins',
                        },
                        {
                            type: 'BUTTON',
                            style: 'DANGER',
                            label: 'إغلاق التذكرة',
                            emoji: '❌',
                            customId: 'closeTicket',
                        }
                    ]
                }
            ]
        });
        // USER MESSAGE
        yield interaction.reply({
            content: `Vist ${channel} To get help from our Staff`,
            ephemeral: true,
        });
    });
}
function createTicketButton(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const getTicketRepo = (0, typeorm_1.getRepository)(Ticket_1.Tickets);
        const Check = yield getTicketRepo.findOne({ userId: interaction.user.id.toString(), status: 'pending', guildId: interaction.guildId.toString() });
        if (Check)
            return yield interaction.reply({ content: 'You Already have a Ticket Channel', ephemeral: true });
        const channel = yield createTicketChannel(interaction);
        const ticket = yield createTicketDB(channel, interaction);
        yield editTicketChannel(channel, ticket);
        yield sendNotifaction(channel, interaction);
    });
}
function buttonhandler(interaction) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.customId === 'openTicket') {
            yield createTicketButton(interaction);
            // await interaction.reply({ content: 'لازم أفتح تذكرة؟, م يمدي نحلها سلمي', ephemeral: true});
        }
        else if (interaction.customId === 'listTickets') {
            const getTicketRepo = (0, typeorm_1.getRepository)(Ticket_1.Tickets);
            const getuser = yield getTicketRepo.findOne({ userId: interaction.user.id.toString(), status: 'pending', guildId: interaction.guildId });
            console.log(getuser);
            if (getuser) {
                const embd = new discord_js_1.MessageEmbed()
                    .setTitle('🎫 - Tickets | تذاكرك')
                    .setDescription(`
                    ${`Ticket ID: **` + getuser.id.toString() + `**\n` +
                    `Ticket Status: **` + getuser.status.toString() + `**\n` +
                    `Ticket channel: **` + ((_b = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(getuser.channelId)) === null || _b === void 0 ? void 0 : _b.toString()) + `**\n`}
                    **Thank You for using Our Tickets System...**
                `)
                    .setFooter({ text: `Requested By ${interaction.user.username.toString()} - ${(_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.name.toString()}`, iconURL: `${(_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.iconURL()}` });
                yield interaction.reply({
                    embeds: [embd],
                    ephemeral: true,
                });
            }
            else {
                yield interaction.reply({ content: `You don't have any tickets`, ephemeral: true });
            }
        }
        else if (interaction.customId === 'closeTicket') {
            yield interaction.reply({
                content: '🎫| هل متأكد من إغلاق التذكرة',
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 'BUTTON',
                                style: 'DANGER',
                                emoji: '❌',
                                label: 'إغلاق',
                                customId: 'closedTicket'
                            },
                        ]
                    }
                ]
            }).then(s => {
                setTimeout(() => {
                    interaction.deleteReply();
                }, 7000);
            });
        }
        else if (interaction.customId === 'closedTicket') {
            const findUser = yield (0, typeorm_1.getRepository)(Ticket_1.Tickets).findOne({ userId: interaction.user.id.toString(), status: 'pending', guildId: interaction.guildId.toString() });
            console.log(findUser);
            if (findUser) {
                console.log(findUser);
                interaction.reply({ content: 'Thank You For test our new Tickets System!' });
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    var _e;
                    const solved = yield (0, typeorm_1.getRepository)(Ticket_1.Tickets).update({ userId: interaction.user.id.toString(), status: 'pending' }, { status: 'solved' });
                    console.log(solved);
                    (_e = interaction.channel) === null || _e === void 0 ? void 0 : _e.delete();
                }), 7000);
            }
            else {
                console.log(`err`);
            }
        }
    });
}
exports.default = buttonhandler;
