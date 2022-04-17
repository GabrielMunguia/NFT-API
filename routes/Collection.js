const {Router}= require('express');
const {  getCollectionsDay, getCollectionsWeek, getCollectionsMoth,saveCollection } = require('../controller/collectionController');



const router = Router();


router.get('/day',getCollectionsDay);
router.get('/week',getCollectionsWeek);
router.get('/month',getCollectionsMoth);

router.post('/',saveCollection);

module.exports=router;

