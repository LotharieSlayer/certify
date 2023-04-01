/* eslint-disable no-case-declarations */
const { setupCertify } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("certify")
        .setDescription(
            "Définir/Supprimer les rôles de certification et de non-certification."
        )
        .addStringOption((string) =>
            string
                .setName("certify_roles")
                .setDescription(
                    "Entrez l'ID du/des rôles de certification qui seront à ajouter. (séparé d'une \",\" si plusieurs)"
                )
                .setRequired(true)
        )
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "certify":
            // eslint-disable-next-line no-case-declarations
            const getCertify = interaction.options.getString("certify_roles");

            if (
                setupCertify.get(interaction.guild.id) === undefined ||
                getCertify != null ||
                undefined
            ) {
                if (
                    getCertify != null ||
                    undefined
                ) {
                    const certifyRoles = getCertify.split(",");
                    setupCertify.set(interaction.guild.id, {
                        certifyRoles
                    });
                    await interaction.reply({
                        content: `**Setup de la certification terminé !**\nCertifié : ${certifyRoles}`,
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: `Setup de la certification à supprimer introuvable, vous devez spécifier les rôles avec des ID si vous souhaitez le configurer.`,
                        ephemeral: true,
                    });
                }
            } else {
                setupCertify.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Setup de la certification supprimé !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
