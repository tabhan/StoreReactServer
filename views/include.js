import React from 'react';
import _ from 'lodash';
import log4js from 'log4js';
import templates from './templates';

const logger = log4js.getLogger('views');

const include = props => {
    if(Array.isArray(props)){
        return props.map(include)
    }

    const type = _.get(props, '@type');
    logger.info('cartridge type', type);
    const template = templates[type];
    return template(props)
}

export default include;