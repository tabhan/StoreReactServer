'use strict';

import log4js from 'log4js';
import _ from 'lodash';
import wcsContent from './wcsContent';
import searchRefinement from './searchRefinementContainer';
import importAll from '../../../utils/importAll';

const logger = log4js.getLogger('middleware');

const processors = importAll(__dirname);

processors.footer = wcsContent;
processors.searchRefinementMultiSelect = searchRefinement;

function populateProcessors(result ,contentItem, ctx) {
    if (_.isArray(contentItem)) {
        _.each(contentItem, o => {
            populateProcessors(result, o, ctx);
        });
    } else {
        const type = _.get(contentItem, '@type');
        if (type) {
            const processor = processors[type];
            if (processor) {
                result.push(processor(contentItem, ctx));
            }
            _.mapValues(contentItem, o => {
                if(_.isObjectLike(o)){
                    populateProcessors(result, o, ctx);
                }
            })
        }
    }
}

export default async (ctx) => {
    logger.trace('enter content item processor');
    const rootContentItem = ctx.state.contentItem;
    const result = [];
    populateProcessors(result, rootContentItem, ctx);

    await Promise.all(result);
}