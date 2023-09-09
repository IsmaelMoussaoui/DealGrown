const express = require('express');
const adController = require('../controllers/adController');

const router = express.Router();

router.get('/deals', adController.getAllAds);
router.post('/deals', adController.createAd);
router.post('/deals/:id/upvote', adController.upvoteAd);
router.post('/deals/:id/downvote', adController.downvoteAd);


module.exports = router;
