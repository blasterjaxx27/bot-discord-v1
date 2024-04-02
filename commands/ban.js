const { Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bannir un utilisateur.',
    execute(message, args) {
        // Vérifie si l'utilisateur a la permission de bannir des membres
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply('Vous n\'avez pas la permission de bannir des membres.');
        }

        // Vérifie si un utilisateur est mentionné dans la commande
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez mentionner l\'utilisateur à bannir.');
        }

        // Essaye de bannir l'utilisateur
        const member = message.guild.members.resolve(user);
        if (member) {
            member.ban()
                .then(() => {
                    message.reply(`L'utilisateur ${user.tag} a été banni avec succès.`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply('Une erreur est survenue lors du bannissement de cet utilisateur.');
                });
        } else {
            message.reply('Cet utilisateur n\'est pas sur ce serveur.');
        }
    },
};
