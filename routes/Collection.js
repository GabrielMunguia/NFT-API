const {Router}= require('express');
const {  getCollectionsDay, getCollectionsWeek, getCollectionsMoth, } = require('../controller/collectionController');



const router = Router();


router.get('/day',getCollectionsDay);
router.get('/week',getCollectionsWeek);
router.get('/month',getCollectionsMoth);

module.exports=router;

