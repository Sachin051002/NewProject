module.exports = (Sequelize, sequelize) => {
  const user = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  user.sync({ alter: true });
  return user;
}

