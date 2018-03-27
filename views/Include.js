import React from 'react';
import _ from 'lodash';
import log4js from 'log4js';
import templates from './templates';

const logger = log4js.getLogger('views');

const include = (props, i) => {

    let contentItem = _.get(props, 'contentItem');

    if(Array.isArray(contentItem)){
        return contentItem.map((e, i) => {
            return include({contentItem: e}, i);
        })
    }

    const type = _.get(contentItem, '@type');
    logger.debug('cartridge type', type);
    if(type == null){
        logger.error('no cartridge type found', props);
        return null;
    }

    const Template = templates[type];
    if(Template == undefined){
        logger.error(`template of ${type} is undefined`);
        logger.debug(props);
        return null;
    }else{
        return <Template contentItem={contentItem} key={i} />
    }
}

export default include;