// app thing
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.status(200).send('Bot is running');
});

app.get('/test-discord', async (req, res) => {
  try {
    const response = await fetch('https://discord.com/api/v10/gateway');
    const text = await response.text();
    res.status(200).json({
      status: response.status,
      contentType: response.headers.get('content-type'),
      body: text.slice(0, 300)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
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

// client.on('messageCreate', (msg) => {
//     
// })

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    let targetChannel = client.channels.cache.get('1550040896014393344')
    console.log('interaction created')


    if (interaction.commandName == 'spam') {
        interaction.reply('started')
        active = true
        msgPosted = 0

        for (msgPosted = 0; msgPosted < 100; msgPosted += 1) {
            if (!active) break
            targetChannel.send('# TEDOMI DEP TRAI NHAT SERVER🗣️')
            await wait(1000)
        }
        if (active){
            targetChannel.send('enough, 100 msg posted so i will stop🥀')
        }

        console.log(msgPosted)

        active = false
        msgPosted = 0
    }

    if (interaction.commandName == 'spamamount') {
        const amount = interaction.options.get('amount').value
        if (0 > amount || 100 < amount) {
            interaction.reply('its more than 100 or smaller than 0 so i will not doing that')
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

client.login(process.env.TOKEN)
  .then(() => console.log('LOGIN THÀNH CÔNG'))
  .catch((err) => console.error('LOGIN THẤT BẠI:', err))

client.on('error', (err) => {
  console.error('CLIENT ERROR:', err)
})