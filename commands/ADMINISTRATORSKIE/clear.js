module.exports = {
    name: 'clear',
    description: "Wyczyść chat!",
    aliases: ['purge'],
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ Nie posiadasz permisji do wykonania tej komendy!")
        if(!args[0]) return message.channel.send('❌ Podaj liczbę wiadomości do usunięcia! |> (2-100)')
        if(isNaN(args[0])) return message.channel.send("❌ Dozwolone są tylko liczby!")
        if(parseInt(args[0]) > 100) return message.channel.send('❌ Maksymalna liczba wiadomości do usunięcia to 100!')
        if(parseInt(args[0]) < 2) return message.channel.send('❌ Minimalna liczba wiadomości do usunięcia to 2!')
        await message.channel.bulkDelete(parseInt(args[0]) + 2)
        .catch(err => console.log(err))
        message.channel.send(`Usunięto ${args[00]} wiadomości!`).then(m => m.delete({ timeout : 3500}))
    }
}