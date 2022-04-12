const {Router}= require('express');
const { getCollections } = require('../controller/collectionController');



const router = Router();


router.get('/',getCollections);



module.exports=router;

