const { Client, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json');
const { embed } = require('./templates.js');

const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		// GatewayIntentBits.GuildMembers,
	],
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const funcs = {
	ping(message, ...args) {
		message.channel.send({ embeds: [
			embed().setAuthor({ name: 'Pong! 🏓' })
		] }).then(async msg => {
			const latency = msg.createdTimestamp - message.createdTimestamp;
			const API_latency = Math.round(client.ws.ping);
			msg.edit({ embeds: [
				embed(msg.embeds[0]).setDescription('Latency is '+latency+'ms\nAPI Latency is '+API_latency+'ms')
			] });
		});
	},
	borf(message, ...args) {
		console.log(m.author)
		message.channel.send('')
	},
	avatar(message, mention, ...args) {
		if (!mention) mention = message.author;
		else mention = get_user_from_mention(mention);
		if (!mention) {
			message.reply('Please use a proper mention if you want to see someone elses avatar.');
		}
		message.reply(`${mention.username}'s avatar: ${mention.displayAvatarURL({ dynamic: true })}`)
	}
};

function get_user_from_mention(content) {
	if (!content) return;

	if (content.startsWith('<@') && content.endsWith('>')) {
		let mention = content.slice(2, -1);
		if (mention.startsWith('!')) mention = mention.slice(1);
		return client.users.cache.get(mention);
	}
}

client.on(Events.MessageCreate, message => {
	const { content } = message;
    if (content.startsWith(prefix)) {
		let [command, ...args] = content.substring(prefix.length).split(/\s+/);
		funcs[command](message, ...args);
	}
})
  

client.login(token);
