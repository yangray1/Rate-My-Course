const Review = require('../models/review.modals');
const log = console.log

// Delete review
// Edit review
// Add review 

deleteReview = (req, res) => {

    const review_id = req.body._id

    Review.findOneAndDelete({"_id": review_id}).then((review) => {
        if (!review) {
			res.status(400).send({message: "Error deleting review"})
		} else {
			res.send(review)
		}
    }).catch((err) => {
        res.status(400).send({message: "Error deleting review"})
    })
}

editReview = (req, res) => {

    // Passing in the whole new review, get the id, from the object passed in.
    // Edit review is the same thing as save review.

    const review_id = req.body._id

    Review.findOne({"_id": review_id}).then((review) => {
        review.course = req.body.course;
        review.reviewer = req.body.reviewer;
        review.profName = req.body.profName;
        review.overallRating = req.body.overallRating;
        review.difficulty = req.body.difficulty;
        review.workload = req.body.workload;
        review.hoursPerWeek = req.body.hoursPerWeek;
        review.textbookUsed = req.body.textbookUsed;
        review.gradeReceived = req.body.gradeReceived;
        review.writtenReview = req.body.writtenReview;
        review.score = req.body.score;
        review.active = req.body.active;

        review.save().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(400).send({message: "Error editing review"})
        })
        
    }).catch((err) => {removed
        res.status(400).send({message: "Error editing review"})
    })

}

addReview = (req, res) => {

    const review = new Review({
        course: req.body.course,
        reviewer: req.body.reviewer,
        profName: req.body.profName,
        overallRating: req.body.overallRating,
        difficulty: req.body.difficulty,
        workload: req.body.workload,
        hoursPerWeek: req.body.hoursPerWeek,
        textbookUsed: req.body.textbookUsed,
        gradeReceived: req.body.gradeReceived,
        writtenReview: req.body.writtenReview,
        score: req.body.score,
        active: req.body.active
    })

    review.save().then((result) => {
		// Save and send object that was saved
		res.send(result)
	}).catch(error => {
		res.status(400).send({message: "Error adding review"}) // 400 for bad request
	});
}

getReviewsByCourse = (req, res) => {

    const courseCode = req.params.coursecode

    Review.find({"course": courseCode}).sort({score: -1}).then((reviews) => { // .sort({score: -1}) ADDED
        res.send(reviews)
    }).catch((err) => {
        res.status(400).send({message: "Error looking for reviews"})
    })
}

getReviewsByUser = (req, res) => {
    
    const user = req.params.user

    Review.find({"reviewer": user}).sort({score: -1}).then((reviews) => { // .sort({score: -1}) ADDED
        res.send(reviews)
    }).catch((err) => {
        res.status(400).send({message: "Error looking for reviews"})
    })

}

upvoteReview = (req, res) => {

    const review_id = req.body._id

    Review.findOne({"_id": review_id}).then((review) => {
        review.score++
        review.save().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(400).send({message: "Error upvoting review"})
        })
    }).catch((err) => {
        res.status(400).send({message: "Error upvoting review"})
    })
    
}

downvoteReview = (req, res) => {

    const review_id = req.body._id
    
    Review.findOne({"_id": review_id}).then((review) => {
        review.score--
        review.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400).send({message: "Error downvoting review"})
        })
    }).catch((err) => {
        res.status(400).send({message: "Error downvoting review"})
    })
    
}

fixReviews = (req, res) => {
    Review.find().then(reviews => {
        reviews.forEach(review => {
            review.active = true
            review.save().then(savedReview => {
                console.log(savedReview);
            });
        });
        res.send({message: 'done'});
    })
}

module.exports = {
    deleteReview,
    editReview,
    addReview,
    getReviewsByCourse,
    getReviewsByUser,
    upvoteReview,
    downvoteReview,
    fixReviews
};