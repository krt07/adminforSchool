module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
      username: { type: DataTypes.STRING, unique: true ,allowNull: false,},
      password: { type: DataTypes.STRING },
    });
  };
  