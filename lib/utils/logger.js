import winston from 'winston';

winston.loggers.add('category1', {
    console: {
        level: 'silly',
        colorize: true
    }
});



export default category => {
    winston.loggers.get('category1').debug(category);
    return winston.loggers.get('category1');

}