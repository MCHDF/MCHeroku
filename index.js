const Discord = require('discord.js');
const bot = new Discord.Client()

bot.on('ready', () => {
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

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content === '!점검') {
        message.delete()
        let embed = new Discord.MessageEmbed()
            .setTitle('Maintenance')
            .setColor('RED')
            .setDescription('현재 점검중이에요..자세한 사항은아래에서 확인해주세요!')
            .addField('[ 사유 ]', '```봇 서버 운영체제, 데이터베이스 등 전반적인 시스템 점검```')
            .addField('[ 기간 ]', '```3시간 (~ 21:00)\n(사정에 따라 연장 혹은 조기종료 될 수 있습니다.)```')
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL())
        message.channel.send(embed);
        return;
    }
})

bot.login(process.env.MCBOT_TOKEN)