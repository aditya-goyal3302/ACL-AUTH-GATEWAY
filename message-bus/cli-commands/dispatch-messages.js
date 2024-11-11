require("dotenv").config();
const { Command } = require("commander");
const { RabbitMQConfig } = require("../rabbitmq/rabbitmq-config");
const { RabbitMQConnection } = require("../rabbitmq/rabbitmq-connection");
const { RabbitMQConfigurer } = require("../rabbitmq/rabbitmq-configurer");
const OutboxMessageRelay = require("../outbox-message-relay");
const { dbConnection } = require("../../config");
const { outboxMessageRepository } = require('../../repositories');
const Producer = require('../workers/producer');
const ora = require('ora-classic');

const program = new Command();

/** 
 * Define the dispatch-messages command
 * To pass any option to this dispatch command from npm script use '--' option e.g 
 * npm run dispatch-messages -- --help
 * npm run dispatch-messages -- --limit 10
 */
program
    .name("dispatch-messages")
    .option("-l, --limit <limit>","Number of messages to dispatch", process.env.DISPATCH_MESSAGE_LIMIT || 10 )
    .description("Dispatch messages with an optional limit")
    .action(async ({limit}) => {
        try {
            const parsedLimit = parseInt(limit);
            if ( isNaN( parsedLimit ) ) throw new Error(`TypeError: Option 'limit' is the wrong type,must be an integer got:${limit}`);
            console.log(`Dispatching messages with limit: ${parsedLimit}`);

            await dbConnection.checkConnection();

            const rabbitMQConnection = new RabbitMQConnection({ rabbitMQConfig: new RabbitMQConfig(ora), reconnectPolicy: true });
            await rabbitMQConnection.connect();

            const rabbitMQConfigurer = new RabbitMQConfigurer(rabbitMQConnection);
            await rabbitMQConfigurer.configure();

            const outboxMessageRelay = new OutboxMessageRelay({ producer: new Producer({ rabbitMQConnection, rabbitMQConfigurer }), outboxMessageRepository });
            await outboxMessageRelay.execute(parsedLimit);

            process.exit(0);
        } catch (error) {
            console.log("Error occurred during message dispatch: ",error.message);
            process.exit(1);
        }
    });

process.on('uncaughtException', (err) => {
    console.log('uncaught exception', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandledRejection', reason);
});

program.parse(process.argv);