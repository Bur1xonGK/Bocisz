const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Napisz coś przez bota!',
    aliases: ['pisz'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const EmbedS = new MessageEmbed()
        .setTitle(message.author.tag, message.author.id)
        .setColor('RANDOM')
        .setDescription(args.join(" "))
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(EmbedS)
    }
}