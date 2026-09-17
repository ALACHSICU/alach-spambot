require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'spam',
        description: 'Spam in the chat (stop when posted 1k msg)'
    },{
        name: 'stop',
        description: 'Stop the current spam'
    },{
        name: 'spamamount',
        description: 'Spam in a amount (not more than 1k)',
        options: [
            {
                name: 'amount',
                description: 'Amount',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log('done')
    } catch (error) {
        console.log(`error: ${error}`)
    }
})();