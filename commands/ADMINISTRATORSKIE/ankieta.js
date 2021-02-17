const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'ankieta',
    description: "Stwórz ankietę!",
    run : async(client, message, args) => {
        const errEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak tekstu!')
        .setDescription('W twojej ankiecie zabrakło tekstu! Dodaj go aby ona powstała!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const permEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak Permisji!')
        .setDescription('Brakuje ci uprawnień do wykonania tej komendy!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return x.send(permEmbed)

        var x = message.channel

        const tresc = args.join(" ")
        
        if(!tresc) return x.send(errEmbed)

        const ankieta = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Ankieta')
        .setDescription(tresc)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        x.send(ankieta).then(async embedMessage =>{
            await embedMessage.react('✅')
            await embedMessage.react('❌')
        })
    }
}