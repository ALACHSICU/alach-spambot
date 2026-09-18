// app thing
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.status(200).send('Bot is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server đang chạy ở port ${PORT}`);
});

// bot thing
require('dotenv').config()
console.log('TOKEN tồn tại:', !!process.env.TOKEN)
console.log('Độ dài TOKEN:', process.env.TOKEN?.length)
const {Client, IntentsBitField, ActivityType} = require('discord.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

const think = [
    'tại sao phải spam cơ chứ ._.?',
    'TEDOMI DEP TRAI NHAT SERVERRRR🗣️🗣️🗣️',
    'spammm',
    'spam 100 tn là đủ đừng bắt spam thêm nx ;-;'
]

let active = false
let msgPosted = 0
let i = 0
let maxMsg = 200

async function wait(milisec) {
  return new Promise((resolve) => setTimeout(resolve, milisec));
}

client.on('clientReady', async () => {
    console.log('ready')

    setInterval(() => {
        client.user.setPresence({
            status: 'idle',
            activities: [{ name: 'Custom Status', state: think[i], type: ActivityType.Custom }]
        })
        i = (i + 1) % think.length
    }, 20000);
});

// client.on('messageCreate', (msg) => {
//     
// })

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    let targetChannel = client.channels.cache.get('1525448756630388758')
    console.log('interaction created')


    if (interaction.commandName == 'spam') {
        interaction.reply('started')
        active = true
        msgPosted = 0

        for (msgPosted = 0; msgPosted < maxMsg; msgPosted += 1) {
            if (!active) break
            targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER🗣️')
            await wait(1000)
        }
        if (active){
            targetChannel.send(`đủ r đấy, ${maxMsg} tin nhắn r, gần nổ server r kìa🥀`)
        }

        console.log(msgPosted)

        active = false
        msgPosted = 0
    }

    if (interaction.commandName == 'spamamount') {
        const amount = interaction.options.get('amount').value
        if (0 > amount || maxMsg < amount) {
            interaction.reply(`nhiều hơn ${maxMsg} hoặc (nhỏ hơn 0) nên không spam đc tránh nổ server🐧`)
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

client.login(process.env.TOKEN)
  .then(() => console.log('LOGIN THÀNH CÔNG'))
  .catch((err) => console.error('LOGIN THẤT BẠI:', err))

client.on('error', (err) => {
  console.error('CLIENT ERROR:', err)
})