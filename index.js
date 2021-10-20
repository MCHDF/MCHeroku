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
            .setTitle('점검')
            .setColor('RED')
            .setDescription('현재 점검중이에요..자세한 사항은 아래를 확인해주세요!')
            .addField('[ 사유 ]', '```알 수 없는 현상으로 인한 우분투 제기능 상실, 포맷 및 재설치```')
            .addField('[ 기간 ]', '```2021년 10월 20일 오후 7시 ~ ```')
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('MCHDF#9999')
        message.channel.send(embed);
        return;
    }
})

bot.login(process.env.MCBOT_TOKEN)
