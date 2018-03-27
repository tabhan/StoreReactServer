import template1 from './template1';
import template2 from './template2';
import contentSlot from './contentSlot';
import wcsContent from './wcsContent';
import fs from 'fs';
import _ from 'lodash';

const files = fs.readdirSync('./views/templates');

const templates = {
    loginPage: template1,
    topSlot: contentSlot,
    footerSlot: contentSlot,
    footer: wcsContent(' '),
    topSectionContainer: contentSlot('topSections'),
    globalContainer_TopSectionLanding: contentSlot('global'),
    globalContainer_MainSectionProductList: contentSlot('global'),
    productListPage: template2
};

_.each(files, file => {
    const key = file.replace('.js', '');
    if (key !== 'index') {
        templates[key] = require('./' + key).default;
    }
});

export default templates;