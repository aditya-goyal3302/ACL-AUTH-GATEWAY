class OutboxMessageRelay {
    /**
     * Create an OutboxMessageRelay instance.
     * @param {object} producer - Producer instance
     * @param {object} outboxMessageRepository - Outbox repository instance
     */
    constructor({ producer, outboxMessageRepository}) {
        this.producer = producer;
        this.outbox = outboxMessageRepository;
    }

    /**
     * Execute the relay of outbox messages.
     * @param {number} maxMessages - The maximum number of messages to process.
     */
    async execute(maxMessages) {
        try {
            const messages = await this.outbox.getUnsentMessages(maxMessages);
            if (!messages.length) {
                console.log("INFO: No messages pending to dispatch.");
                return;
            }

            await this.producer.publishMessages(messages);
            
            console.log('Done publishing messages');
        } catch (error) {
            console.error('Error executing OutboxMessageRelay:', error);
        }
    }
}

module.exports = OutboxMessageRelay;