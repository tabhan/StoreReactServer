'use strict';

import _ from 'lodash';
import log4js from 'log4js';
import asyncRequest from '../../utils/async-request';
import cache from '../../cache';
import processor from './processor';

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

    const orderInfo = asyncRequest({
        url: storeUrl + '/REST/order/current',
        json: true,
        headers: headers
    });

    const ret = {
        contentItem: await contentItem,
        profileInfo: await profileInfo,
        orderInfo: await orderInfo
    };

    ctx.response.status = ret.contentItem.statusCode;
    if (ret.contentItem.statusCode == 200) {
        ctx.state.contentItem = ret.contentItem.body;
    } else {
        ctx.state.contentItem = {
            '@type': 'wcsContent',
            baseURL: ret.contentItem.statusCode
        }
    }
    await processor(ctx);
    ctx.state.profileInfo = ret.profileInfo.body;
    ctx.state.orderInfo = ret.orderInfo.body;
    next();
}

