import _ from 'lodash';

export default async function (contentItem, ctx) {
    let originalUrl = _.get(ctx, 'state.contentItem.endeca:siteState.contentPath');
    const context = _.get(ctx, 'state.contentItem.endeca:siteState.siteId');
    if(originalUrl){
        originalUrl = originalUrl.substr(originalUrl.indexOf(context) + context.length);
    }
    contentItem.originalUrl = originalUrl;
    contentItem.refIndex = _.get(ctx, 'query.refIndex');
    contentItem.querystring = _.get(ctx, 'querystring');
}