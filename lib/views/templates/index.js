import template1 from './template1';
import template2 from './template2';
import contentSlot from './contentSlot';
import wcsContent from './wcsContent';
import importAll from 'lib/utils/importAll';
import _ from 'lodash';

let templates = {
    loginPage: template1,
    topSlot: contentSlot,
    footerSlot: contentSlot,
    footer: wcsContent(' '),
    topSectionContainer: contentSlot('topSections'),
    globalContainer_TopSectionLanding: contentSlot('global'),
    globalContainer_MainSectionProductList: contentSlot('global'),
    productListPage: template2
};

templates = _.merge(importAll(__dirname), templates);
export default templates;