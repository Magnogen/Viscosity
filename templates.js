const { EmbedBuilder } = require('discord.js');

const choose = array => array[0|(Math.random()*array.length)];

const greetings = [
    'Hi from Viscosity',
    'Hello from Viscosity',
    'Hi from Viscosity!',
    'Hello from Viscosity!',
    'Hi from Viscosity :)',
    'Hello from Viscosity :)',
    'Hi from Viscosity :D',
    'Hello from Viscosity :D',
    'Hi from Viscosity! :)',
    'Hello from Viscosity! :)',
    'Hi from Viscosity! :D',
    'Hello from Viscosity! :D',
];

const greeting = () => choose(greetings);

const embed = (template=false) => {
    if (template !== false) return EmbedBuilder.from(template);

	let embed = new EmbedBuilder();
	embed.setColor(0x32a851);
	embed.setFooter({ text: greeting(), iconURL: 'https://magnogen.net/Viscosity/icon.png' });
    
    return embed;
}

exports.greeting = greeting;
exports.embed = embed;