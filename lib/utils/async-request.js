'use strict';

import request from 'request';
import log4js from 'log4js';

const logger = log4js.getLogger('middleware');

export default async function(options) {
    logger.debug('start sending request', options.url);
    return new Promise((resolve) => {
        request(options, (error, response) => {
            logger.debug('end sending request', options.url);

            if (error) {
                throw new Error(error);
            }

            resolve(response);
        });
    })
}