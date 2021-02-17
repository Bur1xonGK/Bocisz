const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['pomoc'],
  description: "Zobacz wszystkie komendy bota!",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "❌ Brak nazwy polecenia!";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "W toku..." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Kraina Minecraft'a BOT -> help!")
        .addFields(categories)
        .setDescription(
          `Witaj! Potrzebujesz pomocy? Sprawdź moje wszystkie komendy na dole!\n \nJeżeli chcesz dowiedzieć się szczegółów o komendzie użyj \`${prefix}help\` a następnie polecenie o którym chcesz się dowiedzieć! Przykład \`${prefix}help ban\``
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Nieznana komenda! Użyj \`${prefix}help\` aby zobaczyć wszystkie moje komendy!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Szczegóły komendy:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "KOMENDA:",
          command.name ? `\`${command.name}\`` : "Komenda nie posiada nazwy!"
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Brak aliasów do tej komendy!."
        )
        .addField(
          "UŻYCIE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "OPIS:",
          command.description
            ? command.description
            : "Brak opisu do tej komendy!"
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(RANDOM);
      return message.channel.send(embed);
    }
  },
};