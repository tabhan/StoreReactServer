import asyncRequest from '../../../utils/async-request';
import cache from '../../../cache';
import _ from 'lodash';

export default async function (contentItem, ctx) {
    const urlTemplate = cache.get('serverConf', 'wcs.urlTemplate');
    const baseURL = _.template(urlTemplate)({
        lookuppage: contentItem.baseURL || _.get(contentItem, 'records[0].attributes.baseURL[0]'),
        path: _.get(ctx, 'state.contentItem.endeca:contentPath')
    });
    const data = await asyncRequest({url: baseURL});
    contentItem.data = data.body;
}