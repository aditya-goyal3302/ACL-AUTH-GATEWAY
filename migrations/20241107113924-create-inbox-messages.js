"use strict";

const { inboxMessageStatus } = require("../models/inbox-message/inbox-message-status");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inbox_messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      message_status: {
        type: Sequelize.ENUM(...inboxMessageStatus.getValues()),
        defaultValue: inboxMessageStatus.ENUM.RECEIVED,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inbox_messages");
  },
};
