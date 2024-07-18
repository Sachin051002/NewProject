module.exports = (Sequelize, sequelize) => {

    const Otp = sequelize.define('Otp', {
      otp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
    });
    Otp.sync({ alter: true });
    return Otp;
  };