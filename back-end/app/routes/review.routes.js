const express = require('express');
const router = express.Router();

const review = require('../controllers/review.controller');
const authMiddleware = require('../../auth.middleware');

const reviewRoute = '/api/review';

router.delete(reviewRoute + '/delete-review', review.deleteReview);
router.patch(reviewRoute + '/edit-review', review.editReview);
router.post(reviewRoute + '/add-review', review.addReview);
router.get(reviewRoute + '/getReviewByCourse/:coursecode', review.getReviewsByCourse);
router.get(reviewRoute + '/getReviewByUser/:user', review.getReviewsByUser);
router.patch(reviewRoute + '/upvote', review.upvoteReview);
router.patch(reviewRoute + '/downvote', review.downvoteReview);

module.exports = router;