const Review = require('../models/review.modals');

// Delete review
// Edit review
// Add review 

deleteReview = (req, res) => {

    const review_id = req.params.id

    Review.findOneAndDelete({"_id": review_id}).then((review) => {
        if (!review) {
			res.status(400).send({message: "Error deleting review"})
		} else {
			res.send({review})
		}
    }).catch((err) => {
        res.status(400).send({message: "Error deleting review"})
    })
}

editReview = (req, res) => {

    const review_id = req.params.id

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

        review.save().then((result) => {
            res.send({review: result})
        }).catch((err) => {
            res.status(400).send({message: "Error editing review"})
        })
        
    }).catch((err) => {
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
        score: req.body.score
    })

    review.save().then((result) => {
		// Save and send object that was saved
		res.send({result})
	}, (error) => {
		res.status(400).send({message: "Error adding review"}) // 400 for bad request
	})
}

module.exports = {
    deleteReview,
    editReview,
    addReview
};