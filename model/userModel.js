module.exports = (Sequelize, sequelize) => {
  const user = sequelize.define("user", {
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
      unique:true
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
    },
    phoneNumber:{
      type:Sequelize.STRING,
    },
    isActive:{
      type: Sequelize.BOOLEAN,
      defaultValue : false
    }
  });

  user.sync({alter:true});
  return user;
}

