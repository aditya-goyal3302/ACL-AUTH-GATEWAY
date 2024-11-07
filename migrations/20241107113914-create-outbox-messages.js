"use strict";

const { outboxMessageStatus } = require("../models/outbox-message/outbox-message-status");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("outbox_messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      message_status: {
        type: Sequelize.ENUM(...outboxMessageStatus.getValues()),
        defaultValue: outboxMessageStatus.ENUM.PENDING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("outbox_messages");
  },
};
