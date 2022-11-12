const { Client, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json');
const { error_embed, embed } = require('./templates.js');

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
		message.reply({ allowedMentions: { repliedUser: false }, embeds: [
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
		message.reply({ allowedMentions: { repliedUser: false }, embeds: [
			embed().setAuthor({ name: 'Hap borf! 🥳' })
		] })
	},
	avatar(message, mention, ...args) {
		if (!mention) mention = message.author;
		else mention = get_user_from_mention(mention);
		if (!mention) {
			return message.reply({ allowedMentions: { repliedUser: false }, embeds: [
				error_embed().setAuthor({ name: 'Please use a proper mention if you want to see someone elses avatar.' })
			] });
		}
		const avatar = mention.displayAvatarURL({ dynamic: true });
		message.reply({ allowedMentions: { repliedUser: false }, embeds: [
			embed().setAuthor({ name: `${mention.username}'s avatar`, url: avatar }).setImage(avatar)
		] })
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
		if (!(command in funcs)) message.reply({ allowedMentions: { repliedUser: false }, embeds: [
			error_embed().setAuthor({ name: 'I dont know what that means oof' })
		] });;
		funcs[command](message, ...args);
	}
})
  

client.login(token);
