require('dotenv').config()
const {Client, IntentsBitField, ActivityType} = require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

let active = false
let msgPosted = 0

async function wait(milisec) {
  return new Promise((resolve) => setTimeout(resolve, milisec));
}

client.on('clientReady', async () => {
    console.log('ready')

    client.user.setActivity({
        name: 'sth',
        type: ActivityType.Listening
    })
});

client.on('messageCreate', (msg) => {
    // let targetChannel = client.channels.cache.get('1525448756630388758') // 1550040896014393344
    // if (msg.content == '!spam'){
    //     targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER')
    //     active = true
    //     didactive = true
    // }
    // if (msg.content == '!stop'){
    //     active = false
    //     didactive = false
    //     msgPosted = 0
    //     msg.reply('stoped')
    // }
    // if (active) {
    //     targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER')
    //     msgPosted += 1
    //     if (msgPosted >= 200) {
    //         msg.reply('enough, 200 msg posted so i will stop🥀')
    //         active = false
    //         didactive = false
    //         msgPosted = 0
    //         msg.reply('stoped')
    //     }
    // }
    // console.log(active, msgPosted)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    let targetChannel = client.channels.cache.get('1550040896014393344')
    console.log('interaction created')


    if (interaction.commandName == 'spam') {
        interaction.reply('started')
        active = true
        msgPosted = 0

        for (msgPosted = 0; msgPosted < 1000; msgPosted += 1) {
            if (!active) break
            targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER🗣️')
            await wait(1000)
        }
        if (active){
            targetChannel.send('enough, 1000 msg posted so i will stop🥀')
        }

        console.log(msgPosted)

        active = false
        msgPosted = 0
    }

    if (interaction.commandName == 'spamamount') {
        const amount = interaction.options.get('amount').value
        if (0 > amount || 1000 < amount) {
            interaction.reply('its more than 1k or smaller than 0 so i will not doing that')
            return
        }
        interaction.reply(`start spaming ${amount} msg`)
        active = true
        msgPosted = 0

        for (msgPosted = 0; msgPosted < amount; msgPosted += 1) {
            if (!active) break
            targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER🗣️')
            await wait(1000)
        }   
        if (active) {
            targetChannel.send('done spamming')
        }
        console.log(msgPosted)

        active = false
        msgPosted = 0
    }

    if (interaction.commandName == 'stop') {
        active = false
        msgPosted = 0
        interaction.reply('stoped')
    }
})

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

client.login(process.env.TOKEN)