const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "This is a weather command, yay!",
  async execute(client, message, args, Discord) {
    weather.find(
      { search: args.join(" "), degreeType: `C` }, function (error, result) {
        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setTitle("Please specify a location.")
            .setColor("PURPLE")
        )

        if (result === undefined || result.length === 0) return message.channel.send(new MessageEmbed()
            .setTitle("Invalid location.")
            .setColor("PURPLE")
        )

        let current = result[0].current;
        let location = result[0].location;

        message.channel.send("Getting Weather Info...").then(m => {
            
            const embed = new MessageEmbed()
            .setAuthor(`Current weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField("Timezone", `UTC ${location.timezone}`, true)
            .addField("Degree Type", "Celcius", true)
            .addField("Temperature", `${current.temperature}°`, true)
            .addField("Wind", `${current.winddisplay}`, true)
            .addField("Feels Like", `${current.feelslike}`, true)
            .addField("Humidity", `${current.humidity}%`, true)
            .setColor("PURPLE");

          m.edit(embed);
        });
      }
    );
  },
};
