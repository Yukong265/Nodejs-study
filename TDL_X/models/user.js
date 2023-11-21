module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User",{
            username: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            hashed_password: {
              type: DataTypes.STRING(200),
              allowNull: false,
            }
        }, {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName: 'User',
            tableName: 'User',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }