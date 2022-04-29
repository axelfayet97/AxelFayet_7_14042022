// MODELE LIKE
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('like', {
        isLiked: {
            allowNull: true,
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
    return Like;
};