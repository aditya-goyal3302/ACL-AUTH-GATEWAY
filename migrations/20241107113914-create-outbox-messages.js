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
      message_id: {
        type: Sequelize.UUID,
        unique: "unique_index",
        allowNull: false,
      },
      message_status: {
        type: Sequelize.ENUM(...outboxMessageStatus.getValues()),
        defaultValue: outboxMessageStatus.ENUM.PENDING,
        allowNull: false,
      },
      sent_at: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Invalid sent_at value.",
          },
        },
      },
      headers: {
        type: Sequelize.JSON,
      },
      properties: {
        type: Sequelize.JSON,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Properties is required.",
          },
        },
      },
      body: {
        type: Sequelize.JSON,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Body is required.",
          },
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("outbox_messages");
  },
};
