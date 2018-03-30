'use strict';

import _ from 'lodash';
import log4js from 'log4js';
import asyncRequest from '../../utils/async-request';
import cache from '../../cache';
import processor from  './processor';

const logger = log4js.getLogger('middleware');

export default async (ctx, next) => {
	const {originalUrl} = ctx.request;
    logger.trace('enter ATG request middleware', originalUrl);
    const storeUrl = cache.get('serverConf', 'store.url');

    const headers = _.merge({}, ctx.request.headers);
    _.merge(headers, cache.get('serverConf', 'store.headers'));
    logger.debug('request headers', headers);


    const contentItem = asyncRequest({
        url: storeUrl + originalUrl,
        json: true,
        headers: headers
    });

    const profileInfo = asyncRequest({
        url: storeUrl + '/REST/profile/current',
        json: true,
        headers: headers
    });

    const ret = {
        contentItem: await contentItem,
        profileInfo: await profileInfo
    };
    ctx.state.contentItem = ret.contentItem.body;
    await processor(ctx);
    ctx.state.profileInfo = ret.profileInfo.body;
    next();
}

