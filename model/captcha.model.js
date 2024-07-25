module.exports = (Sequelize, sequelize) => {
    const Captcha = sequelize.define('captcha', {
        text: {
            type: Sequelize.STRING,
        },
    });

    Captcha.sync({alter:true});

    return Captcha;
};
