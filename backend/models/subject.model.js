module.exports = (sequelize, DataTypes) => {
  return sequelize.define('subject', {
    name: DataTypes.STRING
  });
};
