const {Router}= require('express');
const { check } = require("express-validator");
const { saveAllAssets, getFullAsetsBySlug } = require('../controller/assetController');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarTraits } = require('../middlewares/validarTraits');

const router = Router();


router.post('/:slug',[
    check('slug','El slug es obligatorio').not().isEmpty(),
   
    validarCampos,
    validarTraits

],getFullAsetsBySlug);



router.post('/save/:slug',saveAllAssets);


module.exports=router;

