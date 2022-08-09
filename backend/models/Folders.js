module.exports = (sequelize, DataTypes) => {
  const Folders = sequelize.define(
    "Folders",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentFolder: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "photo",
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Folders;
};
