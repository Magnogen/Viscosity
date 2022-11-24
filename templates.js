const { EmbedBuilder } = require('discord.js');

const choose = array => array[0|(Math.random()*array.length)];

const hillo = (append) => choose(['Hi', 'Hello', 'Hey there', ...append]);
const excl = () => choose(['', '!']);
const smilend = () => choose(['', ' :)', ' :D']);

const greeting = (greets) => choose([
    hillo(greets) + ' from Viscosity' + excl() + smilend()
]);

const embed = ({ template, greets }) => {
    if (template !== undefined) return EmbedBuilder.from(template);

	let embed = new EmbedBuilder();
	embed.setColor(0x32a851);
	embed.setFooter({ text: greeting(greets), iconURL: 'https://magnogen.net/Viscosity/icon.png' });
    
    return embed;
}

const error_embed = (template=false) => {
    if (template !== false) return EmbedBuilder.from(template).setColor(0xa95232);

	let embed = new EmbedBuilder();
	embed.setColor(0xa95232);
	embed.setFooter({ text: greeting(), iconURL: 'https://magnogen.net/Viscosity/icon.png' });
    
    return embed;
}

exports.greeting = greeting;
exports.embed = embed;
exports.error_embed = error_embed;