module.exports = {
    name: "skip",
    aliases: ["fs", "remove"],
    execute(message, args) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.member.voice.channel != message.guild.me.voice.channel) {
            message.channel.send("You must be in my voice channel.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            if (!isNaN(args[0]) && args[0] >= 2) {
                serverQueue.songs.splice(args[0] - 1, 1);
                return message.react("✅");
            };
            if (serverQueue.loop) serverQueue.songs.shift();
            serverQueue.connection.dispatcher.end();
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
