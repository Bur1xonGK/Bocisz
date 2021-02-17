const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unmute',
    description: 'Odcisz osobę!',
    /**
     * @param {Message} message  
     */
    run : async(client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedPermUM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Nie posiadasz uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(EmbedPermUM)

        const EmbedUserErrUM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!Member) return message.channel.send(EmbedUserErrUM)

        const EmbedSuccesUM = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Użytkownik odciszony!')
        .setDescription(`Użytkownik ${Member} został odciszony!`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const role = message.guild.roles.cache.find(role => role.name === 'Wyciszony/a')

        await Member.roles.remove(role)

        message.channel.send(EmbedSuccesUM)
    }
}