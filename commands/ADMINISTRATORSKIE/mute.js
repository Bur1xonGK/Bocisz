const Discord = require('discord.js')
const { Message, GuildMember } = require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mute',
    description : 'Wycisz osobę!',
    /**
     * @param {Message} message  
     */
    run : async(client, message, args) => {
        const EmbedPermM = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Nie posiadasz uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(EmbedPermM)

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedErrM = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!Member) return message.channel.send(EmbedErrM)

        const EmbedRoleErrM = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak roli!')
        .setDescription('Nie znaleziono roli! Bot spróbuje ją stworzyć!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedRoleCreateM = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Utworzono Rolę!')
        .setDescription('Utworzono rolę `Wyciszony/a`!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        
        const reason = args.slice(1).join(" ") || 'Nie podano powodu!'

        const EmbedSuccesM = new Discord.MessageEmbed()
        .setColor('#f542c5')
        .setTitle('Użytkownik Wyciszony!')
        .addField('Administrator:', message.author.username, false)
        .addField('Wyciszony:', Member, false)
        .addField('Powód:', reason, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedUserRoleErrM = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Błąd Użytkownika!')
        .setDescription('Użytkownik posiada już wyciszenie!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    
        
        const role = message.guild.roles.cache.find(role => role.name === 'Wyciszony/a')
        if(!role) {
            try {
                message.channel.send(EmbedRoleErrM)
                
                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'Wyciszony/a',
                        color: 'BLACK',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(EmbedRoleCreateM)
            } catch (error) {
                console.log(error)
            }
        }
        let role2 = message.guild.roles.cache.find(r => r.name === 'Wyciszony/a')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(EmbedUserRoleErrM)
        await Member.roles.add(role2)
        message.channel.send(EmbedSuccesM)

    }
}
