const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Wyrzuć użytkownika!",
    run: async (client, message, args) => {

        const Member = message.mentions.members.first()
        
        const EmbedErrK = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak użytkownika!')
        .setDescription('Podaj właściwego użytkownika do wyrzucenia!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!Member) return message.channel.send(EmbedErrK)
        
        const EmbedPermK = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak permisji!')
        .setDescription('Nie posiadasz uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(EmbedPermK)
        
        const EmbedReasonK = args.slice(1).join(" ") || 'Nie podano powodu!'

        const EmbedK = new MessageEmbed()
        .setColor('#49fc03')
        .setTitle('Użytkownik wyrzucony!')
        .addField('Administrator:', message.author.username, false)
        .addField('Wyrzucony:', Member, false)
        .addField('Powód:', EmbedReasonK, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.guild.member(Member).kick(EmbedReasonK)
        message.channel.send(EmbedK)





    }
}