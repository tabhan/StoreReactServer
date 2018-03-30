'use strict';

import React from 'react';
import ReactDOM from 'react-dom/server';
import _ from 'lodash';
import log4js from 'log4js';
import container from '../../views/container';

const containerFactory = React.createFactory(container);

const logger = log4js.getLogger('middleware');

export default async (ctx, next) => {
    logger.trace('enter HTML renderer');

    if(ctx.response.status == 200){
        const dom = ReactDOM.renderToString(containerFactory(ctx.state));
        ctx.body = `<!DOCTYPE html>${dom}`;
    }else{
        ctx.body = _.get(ctx, 'state.contentItem.data');
    }

    next();
}