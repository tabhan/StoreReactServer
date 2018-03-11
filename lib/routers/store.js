'use strict';

import Router from 'koa-router';
import middlewares from '../middlewares';

const router = new Router();
router.use(middlewares);
router.all('/storechile/*');
router.all('/storeperu/*');

export default router;