const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ban",
    description: "Zbanuj użytkownika!",
    run: async (client, message, args) => {

        const Member = message.mentions.members.first()
        
        const EmbedErrB = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak użytkownika!')
        .setDescription('Podaj właściwego użytkownika do zbanowania!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!Member) return message.channel.send(EmbedErrB)
        
        const EmbedPermB = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak permisji!')
        .setDescription('Nie posiadasz uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(EmbedPermB)
        
        const EmbedReasonB = args.slice(1).join(" ") || 'Nie podano powodu!'

        const EmbedB = new MessageEmbed()
        .setColor('#49fc03')
        .setTitle('Użytkownik zbanowany!')
        .addField('Administrator:', message.author.username, false)
        .addField('Zbanowany:', Member, false)
        .addField('Powód:', EmbedReasonB, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.guild.member(Member).ban(EmbedReasonB)
        message.channel.send(EmbedB)
    }
}