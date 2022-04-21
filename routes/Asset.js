const {Router}= require('express');
const { check } = require("express-validator");
const { saveAllAssets, getFullAsetsBySlug, getFullTraitsBySlug } = require('../controller/assetController');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarOrderBy } = require('../middlewares/validarOrderBy');
const { validarRangoPrecios } = require('../middlewares/validarRangoPrecios');
const { validarTraits } = require('../middlewares/validarTraits');

const router = Router();


router.post('/:slug',[
    check('slug','El slug es obligatorio').not().isEmpty(),
   
    validarCampos,
    validarTraits,
    validarOrderBy,
    validarRangoPrecios

],getFullAsetsBySlug);


router.post('/traits/:slug',getFullTraitsBySlug);
router.post('/save/:slug',saveAllAssets);


module.exports=router;

