const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'propozycja',
    description: "Napisz propozycję!",
    run : async(client, message, args) => {
        const errEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('❌ Brak tekstu!')
        .setDescription('W twojej propozycji zabrakło tekstu! Dodaj go aby ona powstała!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        var x = message.channel

        const tresc1 = args.join(" ")
        
        if(!tresc1) return x.send(errEmbed)
        
        const propozycja = new MessageEmbed()
        .setColor('#8317ff')
        .setTitle('Propozycja')
        .setDescription(tresc1)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        x.send(propozycja).then(async embedMessage =>{
            await embedMessage.react('✅')
            await embedMessage.react('❌')
        })
    }
}