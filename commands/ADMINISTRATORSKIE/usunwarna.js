const { MessageEmbed } = require('discord.js')
const db = require('../../warns')

module.exports = {
    name: 'usunwarna',
    aliases: 'unwarn',
    description: 'Odwarnuj osobę!',
    run: async (client, message, args) => {
        const EmbedPermUW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Brakuje ci uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(EmbedPermUW)

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedErrUW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!user) return message.channel.send(EmbedErrUW)
        
        const EmbedRemoveSucessUW = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Usunięto Warna!')
        .setDescription('Pomyślnie usunięto warna!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedRemoveErrUW = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Numeru!')
        .setDescription(`Podaj numer warna!`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(EmbedRemoveSucessUW)
                if(!number) return message.channel.send(EmbedRemoveErrUW)
                data.save() 
            }
        })
    }
}