const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'invite',
    aliases: ['zapros'],
    description: 'Zaproś bota na swój serwer',
    run : async(client, message, args) => {
        const EmbedInvite = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(' Zaproś bota na swój serwer!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=796771780441669653&permissions=8&scope=bot')
        .setDescription('Aby zaprosić bota na swój serwer **__kliknij__** wiadomość wyżej!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(EmbedInvite)
    }
}
