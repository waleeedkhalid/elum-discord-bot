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
function setroleshandler(interaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.commandName !== 'setrole')
            return;
        if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.Permissions.FLAGS.MANAGE_ROLES)))
            return;
        const type = interaction.options.get('type');
        const targetUser = (_b = interaction.options) === null || _b === void 0 ? void 0 : _b.getUser('user');
        const targetRole = interaction.options.getRole('role');
        console.log(`[type] ${type} \n[targetUser] ${targetUser} \n[targetRole] ${targetRole}`);
        if ((type === null || type === void 0 ? void 0 : type.value) === 'add') {
            const Check = yield ((_d = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.members.cache.find(u => u.id === (targetUser === null || targetUser === void 0 ? void 0 : targetUser.id))) === null || _d === void 0 ? void 0 : _d.roles.cache.has(targetRole === null || targetRole === void 0 ? void 0 : targetRole.id));
            if (Check)
                return yield interaction.reply({ content: 'User Already have the role if you want to delete it, change the type to delete', ephemeral: true });
            try {
                yield ((_f = (_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.members.cache.find(u => u.id === (targetUser === null || targetUser === void 0 ? void 0 : targetUser.id))) === null || _f === void 0 ? void 0 : _f.roles.add(targetRole === null || targetRole === void 0 ? void 0 : targetRole.id, `Command Interaction by ${interaction.user.username}#${interaction.user.discriminator}`));
                yield interaction.reply({ content: 'role added!' });
            }
            catch (err) {
                console.log(err);
            }
        }
        else if ((type === null || type === void 0 ? void 0 : type.value) === 'remove') {
            const Check = yield ((_h = (_g = interaction.guild) === null || _g === void 0 ? void 0 : _g.members.cache.find(u => u.id === (targetUser === null || targetUser === void 0 ? void 0 : targetUser.id))) === null || _h === void 0 ? void 0 : _h.roles.cache.has(targetRole === null || targetRole === void 0 ? void 0 : targetRole.id));
            if (!Check)
                return yield interaction.reply({ content: 'User dont have the role if you want to add it, change the type to add', ephemeral: true });
            try {
                yield ((_k = (_j = interaction.guild) === null || _j === void 0 ? void 0 : _j.members.cache.find(u => u.id === (targetUser === null || targetUser === void 0 ? void 0 : targetUser.id))) === null || _k === void 0 ? void 0 : _k.roles.remove(targetRole === null || targetRole === void 0 ? void 0 : targetRole.id, `Command Interaction by ${interaction.user.username}#${interaction.user.discriminator}`));
                yield interaction.reply({ content: 'role removed!' });
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
exports.default = setroleshandler;
