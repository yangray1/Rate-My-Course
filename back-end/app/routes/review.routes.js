const express = require('express');
const router = express.Router();

const review = require('../controllers/review.controller');
const authMiddleware = require('../../auth.middleware');

const reviewRoute = '/api/review';

router.delete(reviewRoute + '/delete-review/:id', review.deleteReview);
router.patch(reviewRoute + '/edit-review/:id', review.editReview);
router.post(reviewRoute + '/add-review', review.addReview);

module.exports = router;