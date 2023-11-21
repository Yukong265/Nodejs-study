module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Item",
    {
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,

      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "Item",
      tableName: "Item",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
