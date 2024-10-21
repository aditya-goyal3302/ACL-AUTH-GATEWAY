"use strict";
const { Model } = require("sequelize");
const { turnstileAclRoles } = require("./turnstile-acl-roles");
const { turnstileAclMethods } = require("./turnstile-acl-methods");

module.exports = (sequelize, DataTypes) => {
  class TurnstileAcl extends Model {
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
      end_point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM(...turnstileAclMethods.getValues()),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...turnstileAclRoles.getValues()),
        allowNull: false,
      }, // for role wise access
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
      modelName: "TurnstileAcl",
      tableName: "turnstile_acls",
    }
  );
  return TurnstileAcl;
};
