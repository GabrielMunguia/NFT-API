const {Router}= require('express');

const { saveAllAssets, getFullAsetsBySlug } = require('../controller/assetController');
const router = Router();


router.get('/:slug',getFullAsetsBySlug);
router.post('/:slug',saveAllAssets);


module.exports=router;

