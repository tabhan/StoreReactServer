'use strict';

import 'babel-polyfill';
import Koa from 'koa';
import cache from './cache';
import store from './routers/store';
import admin from './routers/admin';
import log4js from 'log4js';


const logger = log4js.getLogger('server');


const app = new Koa();

app.use(store.routes()).use(store.allowedMethods())
    .use(admin.routes()).use(admin.allowedMethods());

cache.reload('loggerConf');
cache.reload('serverConf', config => {
    logger.info(`server starts, listening ${config.server.port}`);
    app.listen(config.server.port);
});