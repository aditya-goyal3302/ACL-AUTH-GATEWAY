"use strict";
const { Model } = require("sequelize");
const { outboxMessageStatus } = require("../outbox-message/outbox-message-status");

module.exports = (sequelize, DataTypes) => {
  class OutboxMessage extends Model {}

  OutboxMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message_id: {
        type: DataTypes.UUID,
        unique: "unique_index",
        allowNull: false,
      },
      message_status: {
        type: DataTypes.ENUM(...outboxMessageStatus.getValues()),
        defaultValue: outboxMessageStatus.ENUM.PENDING,
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Invalid sent_at value.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OutboxMessage",
      tableName: "outbox_messages",
    }
  );
  return OutboxMessage;
};
