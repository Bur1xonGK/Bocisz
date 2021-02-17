const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    description: "Informacje o serwerze!",
    aliases: ['guildinfo'],
    run : async(client, message) => {
        const verificationLevels = {
            NONE: '❌ Brak',
            LOW: '🟩 Niski',
            MEDIUM: '🟨 Średni',
            HIGH: '🟧 Wysoki',
            VERY_HIGH: '🟥 Bardzo Wysoki'
        }
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emoji = message.guild.emojis.cache;
        const icon = message.guild.iconURL({ dynamic: true })

        const embed = new MessageEmbed()
        .setTitle(`Informacje o serwerze **${message.guild.name}**!`, icon)
        .setColor('RANDOM')
        .setThumbnail(icon)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addField('🗒️ Ogólne:', [
            `**🎖️ Właściciel/ka:** ${message.guild.owner}`,
            `**🔗 ID Serwera:** ${message.guild.id}`,
            `**🏝️ Region:** ${message.guild.region}`,
            `**📡 Poziom Zabezpieczeń:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**⬆️ Poziom ulepszeń:** ${message.guild.premiumTier ? `Poziom ${message.guild.premiumTier}` : 'None'}`,
            `**✈️ Ulepszeń:** ${message.guild.premiumSubscriptionCount || `None`}`, '\u200b'
        ])
        .addField('🗒️ Emoji:', [
            `**🖼️ Zwykłych Emoji:** ${emoji.filter(emoji => !emoji.animated).size}`,
            `**🎦 Animowanych Emoji:** ${emoji.filter(emoji => emoji.animated).size}`, '\u200b'
        ])
        .addField('🗒️ Statystyki:', [
            `**👥 Członków:** ${message.guild.memberCount}`,
            `**👦 Osób:** ${members.filter(member => !member.user.bot).size}`,
            `**🤖 Botów:** ${members.filter(member => member.user.bot).size}`,
            `**🦸‍♂️ Roli:** ${roles.length}`, '\u200b'
        ])
        .addField('🗒️ Kanały:', [
            `**📑 Kanałów Tekstowych:** ${channels.filter(channel => channel.type === 'text').size}`,
            `**🎙️ Kanałów Głosowych:** ${channels.filter(channel => channel.type === 'voice').size}`, '\u200b'
        ])
            .addField('🗒️ Aktywność:', [
            `**🟢 Online:** ${members.filter(member => member.presence.status === 'online').size}`,
            `**💤 Bezczynni:** ${members.filter(member => member.presence.status === 'idle').size}`,
            `**😤 Nie Przeszkadzać:** ${members.filter(member => member.presence.status === 'dnd').size}`,
            `**🛌 Nieaktywni:** ${members.filter(member => member.presence.status === 'offline').size}`,
        ])
        message.channel.send(embed)
    }
}