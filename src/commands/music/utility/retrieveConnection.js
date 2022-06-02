const {joinVoiceChannel} = require('@discordjs/voice');

module.exports = async (voiceChannel) => {
    const connection = await getVoiceConnection(voiceChannel.guild.id);

    return connection ? connection : await joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
};