import { Review } from './review.service';

export let REVIEWS: Review[] = [
    { course: "CSC209", reviewer: "yangray1", profName: "Michelle Craig", overallRating: 5, difficulty: 2, workload: 2, hoursPerWeek: 2, textbookUsed: false, gradeReceived: "A", writtenReview: "very enjoyable course, a3 takes up a lot of time though this review is hardcoded", score: 0 },
    { course: "CSC207", reviewer: "yangray1", profName: "Ray Mond", overallRating: 2, difficulty: 4, workload: 4, hoursPerWeek: 20, textbookUsed: true, gradeReceived: "B", writtenReview: "this course is so hard :( this review is hardcoded", score: 0 },
    { course: "CSC209", reviewer: "Anon", profName: "Mich Elle", overallRating: 4, difficulty: 1, workload: 1, hoursPerWeek: 3, textbookUsed: true, gradeReceived: "A+", writtenReview: "this course is so easy :) this review is hardcoded", score: 0 }
];
