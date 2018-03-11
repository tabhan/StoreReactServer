'use strict';

import _ from 'lodash';
import Router from 'koa-router';
import log4js from 'log4js';
import cache from '../cache';
import koaBody from 'koa-body';

const logger = log4js.getLogger('router');

async function handleGET(ctx, next) {
    const {key, path} = ctx.state;
    ctx.response.status = 200;
    ctx.response.body = cache.get(key, path);
    logger.info('GET' ,ctx.response.body);
    next();
}

async function handleDELETE(ctx, next) {
    const {op, key, path} = ctx.state;

    if(op == 'delete'){
        logger.info('DELETE', key, path);

        cache.del(key, path);
        if (_.isEmpty(path)) {
            // if all cache info is delete, reload it.
            cache.reload(key);
        }
    }

    next();
}

async function handlePOST(ctx, next) {
    const {op, key, path} = ctx.state;

    if(op == 'post'){
        logger.info('POST', key, path, ctx.request.body);
        cache.set(key, path, ctx.request.body);
    }

    next();
}

const router = new Router();
router.param('query', async (query, ctx, next) => {
    const queryArr = _.split(query, /\//);
    ctx.state.op = _.toLower(_.get(ctx, 'query.op', ctx.method));
    ctx.state.key = _.head(queryArr);
    ctx.state.path = _.drop(queryArr);
    next();
}).all('/admin/cache/:query*', koaBody(), handleDELETE, handleGET);

export default router;