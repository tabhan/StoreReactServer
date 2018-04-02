import asyncRequest from '../../../utils/async-request';
import cache from '../../../cache';
import _ from 'lodash';
import url from 'url';

export default async function (contentItem, ctx) {
    const baseURL = _.merge({}, cache.get('serverConf', 'wcs.url'));
    baseURL.query = _.merge({}, baseURL.query, {
        lookuppage: contentItem.baseURL || _.get(contentItem, 'records[0].attributes.baseURL[0]'),
        path: _.get(ctx, 'state.contentItem.endeca:contentPath')
    });

    const data = await asyncRequest({url: url.format(baseURL)});
    contentItem.data = data.body;
}