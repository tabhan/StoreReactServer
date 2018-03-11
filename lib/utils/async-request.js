'use strict';

import request from 'request';

export default async function(options) {
    return new Promise((resolve) => {
        request(options, (error, response) => {
            if (error) {
                throw new Error(error);
            }

            resolve(response);
        });
    })
}