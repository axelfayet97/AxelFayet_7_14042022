// MODELE LIKE
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('like', {
        isLiked: {
            allowNull: true,
            type: Sequelize.INTEGER,
            default: 0
        }
    });
    return Like;
};