module.exports = (sequelize, DataTypes) => {
  const Folders = sequelize.define("Folders", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Folders;
};
