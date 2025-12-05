import pino from 'pino';
import pretty from 'pino-pretty';

export const logger = pino(
  { level: 'debug' }, // possible log levels : trace, debug, info, warn, error, fatal
  pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  })
);
