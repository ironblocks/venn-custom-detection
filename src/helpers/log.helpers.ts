import dotenv from 'dotenv'
import winston from 'winston'

dotenv.config()

/**
 * Creates and configures a Winston logger instance.
 *
 * The logger is configured with:
 * - A log level determined by the `LOG_LEVEL` environment variable or defaults to `'info'`.
 * - Colored log output.
 * - Timestamps in the format `'YYYY-MM-DD HH:mm:ss'`.
 * - A custom log message format that includes the timestamp, log level, and message.
 * - A console transport to output logs to the console.
 *
 * @returns A configured `winston.Logger` instance that can be used for logging throughout the application.
 *
 * @example
 * ```typescript
 * const logger = createLogger();
 *
 * logger.info('This is an info message');
 * logger.error('This is an error message');
 * ```
 */
export function createLogger() {
    return winston.createLogger({
        level: process.env.LOG_LEVEL ?? 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
                ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`,
            ),
        ),
        transports: [new winston.transports.Console()],
    })
}
