const {Router}= require('express');

const { getAssets, getFullAsets, getFullAsetsBySlug } = require('../controller/assetController');
const router = Router();

router.get('/:slug',getAssets);
router.get('/full/:slug',getFullAsetsBySlug);
router.post('/:slug',getFullAsets);


module.exports=router;

