// MODELE COMMENTAIRES
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            get: function () { // or use get(){ }
                return this.getDataValue('createdAt')
                    .toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
            }
        }
    });
    return Comment;
};