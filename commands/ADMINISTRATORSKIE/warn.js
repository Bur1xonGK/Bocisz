const db = require('../../warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'Zwarnuj użytkownika!',
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        const EmbedPermW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Brakuje ci uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(EmbedPermW)

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedErrW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!user) return message.channel.send(EmbedErrW)

        const reason = args.slice(1).join(" ") || 'Nie podano powodu!'

        const EmbedSucessUserW = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Zostałeś Zwarnowany!')
        .addField('Administator:', message.author.tag, false)
        .addField('Zwarnowany:', user, false)
        .addField('Serwer:', message.guild.name, false)
        .addField('Powód:', reason, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedSucessW = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Użytkownik Zwarnowany!')
        .addField('Administator:', message.author.tag, false)
        .addField('Zwarnowany:', user, false)
        .addField('Powód:', reason, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        db.findOne({ guildid: message.guild.id, user: user.user.id}, async (err, data) => {
            if(err) throw err
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user: user.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save()
        })
        user.send(EmbedSucessUserW)
        message.channel.send(EmbedSucessW)
    }
}