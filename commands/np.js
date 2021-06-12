module.exports = {
    name: "np",
    execute(message) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue || !serverQueue.songs[0]) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        const npembed = require("../embeds/npembed");
        npembed.execute(message);
        return message.react("✅");
    }
};
