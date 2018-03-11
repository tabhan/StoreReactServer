'use strict';

import _ from 'lodash';
import log4js from 'log4js';
import asyncRequest from '../utils/async-request';
import cache from '../cache';

const logger = log4js.getLogger('middleware');

export default async (ctx, next) => {
	const {originalUrl} = ctx.request;
    logger.trace('enter ATG request middleware', originalUrl);
	const url = cache.get('serverConf', 'store.url') + originalUrl;

    const headers = _.merge({}, ctx.request.headers);
    _.merge(headers, cache.get('serverConf', 'store.headers'));
    logger.debug('request headers', headers);


    const response = await asyncRequest({
        url: url,
        json: true,
        headers: headers
    });

    _.merge(ctx.state, response.body);
    next();
}

