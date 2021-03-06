
const { Client, Intents} = require('discord.js');

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

bot.once('ready', () => {
    console.log(`┌────────────────────────────┐`);
    console.log(`│ 봇 ${bot.user.username}이 작동 시작합니다!│`);
    console.log(`└────────────────────────────┘`);
    let statuses = [
        `점검중입니다!`,
        `자세한 정보는 '!점검'`
    ]
    let value = 0;
    setInterval(() => {
        let status = statuses[value];
        value++;
        if (value >= statuses.length) {
            value = 0;
        }
        bot.user.setActivity(status, { type: "PLAYING" });

    }, 3000);
    bot.user.setStatus('dnd');
})

bot.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content === '!점검') {
        message.delete()
        let embed = new Discord.MessageEmbed()
            .setTitle('점검')
            .setColor('RED')
            .setDescription('현재 점검중이에요..자세한 사항은 아래를 확인해주세요!')
            .addField('[ 사유 ]', '```Ubuntu 22.04 Upgrade```')
            .addField('[ 기간 ]', '```2022년 5월 4일 오전 11시 ~ ```')
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('MCHDF#9999')
        message.channel.send(embed);
        return;
    }
})

bot.login(process.env.MCBOT_TOKEN)
