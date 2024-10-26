"use strict";
const { turnstileAclMethods } = require("../models/turnstile-acl/turnstile-acl-methods");
const { turnstileAclRoles } = require("../models/turnstile-acl/turnstile-acl-roles");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("turnstile_acls", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      end_point: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      method: {
        type: Sequelize.ENUM(...turnstileAclMethods.getValues()),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(...turnstileAclRoles.getValues()),
        // allowNull: false,
      }, // for role wise access
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("turnstile_acls");
  },
};
