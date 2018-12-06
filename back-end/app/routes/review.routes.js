const express = require('express');
const router = express.Router();

const review = require('../controllers/review.controller');
const authMiddleware = require('../../auth.middleware');

const reviewRoute = '/api/review';

router.delete(reviewRoute + '/delete-review', authMiddleware, review.deleteReview);
router.patch(reviewRoute + '/edit-review', authMiddleware, review.editReview);
router.post(reviewRoute + '/add-review', authMiddleware, review.addReview);
router.get(reviewRoute + '/getReviewByCourse/:coursecode', review.getReviewsByCourse);
router.get(reviewRoute + '/getReviewByUser/:user', authMiddleware, review.getReviewsByUser);
router.patch(reviewRoute + '/upvote', authMiddleware, review.upvoteReview);
router.patch(reviewRoute + '/downvote', authMiddleware, review.downvoteReview);
router.get(reviewRoute + '/fix-reviews', review.fixReviews);

module.exports = router;