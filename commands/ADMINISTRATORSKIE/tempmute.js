const { Message, MessageEmbed, GuildMember } = require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    description : 'Wycisz osobę na określony czas!',
    /**
     * @param {Message} message  
     */
    run : async(client, message, args) => {
        const EmbedPermTM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Nie posiadasz uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(EmbedPermTM)

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const EmbedErrTM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Użytkownika!')
        .setDescription('Nie znaleziono użytkownika!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!Member) return message.channel.send(EmbedErrTM)
        
        const EmbedTimeErrTM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak czasu!')
        .setDescription('Nie podałeś czasu! Przykład to `5s/m/h`')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        
        const time = args[1]
        if(!time) return message.channel.send(EmbedTimeErrTM)

        const EmbedRoleErrTM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak roli!')
        .setDescription('Nie znaleziono roli! Bot spróbuje ją stworzyć!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        
        const EmbedRoleCreateTM = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Utworzono Rolę!')
        .setDescription('Utworzono rolę `Wyciszony/a`!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        
        const reason = args.slice(2).join(" ") || 'Nie podano powodu!'
        
        const EmbedSuccesTM = new MessageEmbed()
        .setColor('#f542c5')
        .setTitle('Użytkownik Wyciszony!')
        .addField('Administrator:', message.author.username, false)
        .addField('Wyciszony:', Member, false)
        .addField('Czas:', time, false)
        .addField('Powód:', reason, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedSuccesFullTM = new MessageEmbed()
        .setColor('#f542c5')
        .setTitle('Użytkownik Odciszony!')
        .addField('Administrator:', message.author.username, false)
        .addField('Wyciszony:', Member, false)
        .addField('Czas:', time, false)
        .addField('Powód:', reason, false)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const EmbedUserRoleErrTM = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Błąd Użytkownika!')
        .setDescription('Użytkownik posiada już wyciszenie!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    
        const role = message.guild.roles.cache.find(role => role.name === 'Wyciszony/a')
        if(!role) {
            try {
                message.channel.send(EmbedRoleErrTM)
                
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
                message.channel.send(EmbedRoleCreateTM)
            } catch (error) {
                console.log(error)
            }
        }
        let role2 = message.guild.roles.cache.find(r => r.name === 'Wyciszony/a')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(EmbedUserRoleErrTM)
        await Member.roles.add(role2)
        message.channel.send(EmbedSuccesTM)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(EmbedSuccesFullTM)
        }, ms(time))
    }
}