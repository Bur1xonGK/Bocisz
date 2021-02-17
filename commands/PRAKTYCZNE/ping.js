const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Zobacz swój ping!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Ładowanie`)
        const embed = new MessageEmbed()
            .setTitle('Twój ping!')
            .setDescription(`Ping: ${client.ping}MS\nPing podczas wysyłania wiadomości: **${Math.floor(msg.createdAt - message.createdAt)}**MS!`)
            .setColor('RANDOM')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            await message.channel.send(embed)
            msg.delete()

    }
}
