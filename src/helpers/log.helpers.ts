import winston from 'winston'

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
