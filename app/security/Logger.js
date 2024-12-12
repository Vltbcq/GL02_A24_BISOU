const {createLogger, format, transports} = require("winston");

// Configuration du logger à utiliser dans le reste de l'applicatif
const logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [new transports.File({
        filename: `${__dirname}/../logs/.logs.json`,
        format: format.json(),
    })],
});

module.exports = logger;