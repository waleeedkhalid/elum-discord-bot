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
function tickethandler(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.commandName !== 'ticket')
            return;
        if (interaction.user.id !== '324261688062771200')
            return;
        const subcommand = interaction.options.get('type');
        if ((subcommand === null || subcommand === void 0 ? void 0 : subcommand.value) === 'send') {
            yield ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                embeds: [
                    {
                        title: '🎫 | Tickets - التذاكر',
                        description: '\n\n 📩 | فتح تذكرة \n\n 📃 | قائمة تذاكرك \n',
                        footer: { text: `${(_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.name} - Tickets System`, iconURL: `${(_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.iconURL()}` },
                    },
                ],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 'BUTTON',
                                style: 'SUCCESS',
                                emoji: '📩',
                                label: ' | فتح تذكرة ',
                                customId: 'openTicket',
                            },
                            {
                                type: 'BUTTON',
                                style: 'SECONDARY',
                                emoji: '📃',
                                label: ' | قائمة تذاكرك ',
                                customId: 'listTickets',
                            }
                        ]
                    }
                ]
            }));
            yield interaction.reply({ content: "Message sent!", ephemeral: true });
        }
    });
}
exports.default = tickethandler;
;
