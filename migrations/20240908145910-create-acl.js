"use strict";
const { aclMethods } = require("../models/acl/acl-methods");
const { aclRoles } = require("../models/acl/acl-roles");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("acls", {
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
        type: Sequelize.ENUM(...aclMethods.getValues()),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(...aclRoles.getValues()),
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
    await queryInterface.dropTable("acls");
  },
};