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
            .setTitle('Inspection')
            .setColor('RED')
            .setDescription('현재 점검중이에요..자세한 사항은 아래를 확인해주세요!')
            .addField('[ 사유 ]', '```인터넷 모뎀과 공유기 위치 변경으로 인한 네트워크 단절 및 네트워크 재구축으로 인한 ```')
            .addField('[ 기간 ]', '```2021년 10월 13일 오전 10시 ~ 오후 12시 약 1시간```')
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter('MCHDF#9999')
        message.channel.send(embed);
        return;
    }
})

bot.login(process.env.MCBOT_TOKEN)
