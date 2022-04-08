const {Router}= require('express');
const { getAssets, getFullAsets } = require('../controller/assetController');
const router = Router();

router.get('/:slug',getAssets);
router.post('/:slug',getFullAsets);


module.exports=router;

