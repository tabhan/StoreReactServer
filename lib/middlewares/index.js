
import requestAtg from './request-atg';
import renderHTML from './render-html';
import koaBody from 'koa-body';

export default [
    koaBody(),
    requestAtg,
    renderHTML
]