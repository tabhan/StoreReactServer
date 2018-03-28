'use strict';

import cache from '../cache';

export default function(page, key, defaultValue) {
    return cache.get('contentMsg', [page, key]) || defaultValue;
}