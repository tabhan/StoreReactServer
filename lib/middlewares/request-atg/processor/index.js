'use strict';

import log4js from 'log4js';
import _ from 'lodash';
import fs from 'fs';
import wcsContent from './wcsContent';

const logger = log4js.getLogger('middleware');


const files = fs.readdirSync('./lib/middlewares/request-atg/processor');

const processors = {
    footer: wcsContent
};

_.each(files, file => {
    const key = file.replace('.js', '');
    if (key !== 'index') {
        processors[key] = require('./' + key).default;
    }
});

class Processor{
    constructor(fn, contentItem){
        this.fn = fn;
        this.contentItem = contentItem;
    }
}


function populateProcessors(fnList ,contentItem) {
    if (_.isArray(contentItem)) {
        _.each(contentItem, o => {
            populateProcessors(fnList, o);
        });
    } else {
        const type = _.get(contentItem, '@type');
        if (type) {
            const processor = processors[type];
            if (processor) {
                fnList.push(processor(contentItem));
            }
            _.mapValues(contentItem, o => {
                if(_.isObjectLike(o)){
                    populateProcessors(fnList, o);
                }
            })
        }
    }
}

export default async (rootContentItem) => {
    logger.trace('enter content item processor');

    const result = [];
    populateProcessors(result, rootContentItem);

    await Promise.all(result);

    return rootContentItem;
}