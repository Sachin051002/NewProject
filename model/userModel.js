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
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
    },
    address:{
      type:Sequelize.STRING,
    }
  });

  user.sync({alter:true});
  return user;
}

