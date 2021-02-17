const db = require('../../warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warninfo',
    aliases: ['warnlist'],
    description: 'Zwarnuj użytkownika!',
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedErrW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!user) return message.channel.send(EmbedErrW)

        const EmbedNotW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Warnów!')
        .setDescription(`Nie znaleziono żadnych warnów u użytkownika **${user.user.tag}**!`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const reason = args.slice(1).join(" ") || 'Nie podano powodu!'

        db.findOne({ guildid: message.guild.id, user: user.user.id}, async (err, data) => {
            if(err) throw err
            if(data.content.length) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Warny Użytkownika ${user.user.tag}!`)
                    .setDescription(
                        data.content.map(
                            (w, i) =>
                            `\`${i + 1}\` | Administrator: ${message.guild.members.cache.get(w.moderator).user.tag}\n Powód: ${w.reason}`
                        )
                    )
                    .setColor('RANDOM')
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                )
            } else {
                message.channel.send(EmbedNotW)
            }
        })
    }
}