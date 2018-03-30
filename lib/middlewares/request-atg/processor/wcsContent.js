import asyncRequest from '../../../utils/async-request';
import cache from '../../../cache';
import _ from 'lodash';

export default async function (contentItem) {
    const urlTemplate = cache.get('serverConf', 'wcs.urlTemplate');
    const baseUrl = _.template(urlTemplate)({lookuppage:_.get(contentItem, 'records[0].attributes.baseURL[0]'), path:''});
    const data = await asyncRequest({url: baseUrl});
    contentItem.DTO.banner.data = data.body;
}