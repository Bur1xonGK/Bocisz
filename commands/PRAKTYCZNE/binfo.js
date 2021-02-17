const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'botinfo',
    description: "Informacje o bocie!",
    run : async(client, message) => {
        const botAuthor = "!BurixonGK#0001"
        const botActualization = "Zaktualizowano komendy serverinfo i botinfo!"

        const embed = new MessageEmbed()
        .setTitle("Informacje o bocie **Kraina Minecraft'a BOT**!")
        .setColor('RANDOM')
        .addField('👤 Twórca Bota:',
        botAuthor, true)
        .addField('♻️ Treść Aktualizacji:',
        botActualization, true)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed)
    }
}