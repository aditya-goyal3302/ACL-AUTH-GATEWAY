"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TurnstileAcl extends Model {
    static associate(models) {

      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      models.User.hasMany(this, {
        foreignKey: "user_id",
        as: "userAcls",
      });

      models.User.belongsToMany(models.TurnstileAcl, {
        through: this, // Join through UserAcl table
        foreignKey: "user_id", // Foreign key in UserAcl pointing to User
        otherKey: "acl_id", // Foreign key in UserAcl pointing to TurnstileAcl
        as: "acls", // Alias for the TurnstileAcl association
      });

      models.TurnstileAcl.belongsToMany(models.User, {
        through: this,
        foreignKey: "acl_id",
        otherKey: "user_id",
        as: "users",
      });

      models.TurnstileAcl.hasMany(this, {
        foreignKey: "acl_id",
        as: "turnstile_acl",
      });

      this.belongsTo(models.TurnstileAcl, {
        foreignKey: "acl_id",
        as: "acl",
      });
      
    }
  }

  TurnstileAcl.init(
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
  return TurnstileAcl;
};
