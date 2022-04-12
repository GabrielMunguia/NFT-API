const {Router}= require('express');
const { check } = require("express-validator");
const { saveAllAssets, getFullAsetsBySlug } = require('../controller/assetController');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarTraits } = require('../middlewares/validarTraits');
const router = Router();


router.post('/:slug',[
    check('slug','El slug es obligatorio').not().isEmpty(),
    check('page','The page is required').not().isEmpty(),
    check('page','The page must be an integer').isInt(),
    check('page','The page must be a number greater than zero ').isNumeric({min:1}),
    validarCampos,
    validarTraits
],getFullAsetsBySlug);



router.post('/save/:slug',saveAllAssets);


module.exports=router;

