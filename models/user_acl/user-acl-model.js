"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAcl extends Model {
    static associate(models) {

      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      
      this.belongsTo(models.Acl, {
        foreignKey: "acl_id",
        as: "acl",
      });

      models.User.hasMany(this, {
        foreignKey: "user_id",
        as: "userAcls",
      });
      
      models.Acl.hasMany(this, {
        foreignKey: "acl_id",
        as: "acl",
      });

      models.User.belongsToMany(models.Acl, {
        through: this, // Join through UserAcl table
        foreignKey: "user_id", // Foreign key in UserAcl pointing to User
        otherKey: "acl_id", // Foreign key in UserAcl pointing to Acl
        as: "acls", // Alias for the Acl association
      });

      models.Acl.belongsToMany(models.User, {
        through: this,
        foreignKey: "acl_id",
        otherKey: "user_id",
        as: "users",
      });

    }
  }

  UserAcl.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      acl_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref: "turnstile_acls",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref: "users",
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserAcl",
      tableName: "user_acls",
    }
  );
  return UserAcl;
};
