/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'certify'.
 *      Allow mods to certify someone in the server.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getSetupData } = require("../utils/enmapUtils");
const { VERIFIED } = require("../files/welcomeMessages.js");

/*      AUTHORISATION      */
const { Certify } = require("../files/modules.js");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("certify")
    .setDescription("[role] Certifier une personne.")
    .setDefaultPermission(false)
    .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("Entrez l'utilisateur.")
            .setRequired(true)
    );

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'certify'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    if (Certify == false) return;

    const roles = await getSetupData(interaction.guild.id, "certify");
    if(roles === undefined) return

    const member = interaction.options.getMember("user");
    
    for (let i = 0; i < roles.certifyRoles.length; i++) {
        await member.roles.add(interaction.guild.roles.cache.get(roles.certifyRoles[i]));
    }
    for (let i = 0; i < roles.nCertifyRoles.length; i++) {
        await member.roles.remove(interaction.guild.roles.cache.get(roles.nCertifyRoles[i]));
    }

    await member.send({ embeds: [VERIFIED] });

    await interaction.reply({
        content: `Vous avez bien certifié <@${member.user.id}> !`,
        ephemeral: false,
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
