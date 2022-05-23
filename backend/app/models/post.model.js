// MODELE POST
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            get: function () { // or use get(){ }
                return this.getDataValue('createdAt')
                    .toLocaleString('fr-FR', { timeZone: 'UTC' });
            }
        }
    });
    return Post;
};