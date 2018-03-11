'use strict';

import React from 'react';
import ReactDOM from 'react-dom/server';
import log4js from 'log4js';
import container from '../../views/container';

const containerFactory = React.createFactory(container);

const logger = log4js.getLogger('middleware');

export default async (ctx, next) => {
    logger.trace('enter store router');
    ctx.body = '<!DOCTYPE html>' + ReactDOM.renderToString(containerFactory(ctx.state));
}