import { ReviewService } from './_services/review.service'

export class Review {
    course: string;
    reviewer: string;
    profName: string;
    overallRating: number;
    difficulty: number;
    workload: number;
    hoursPerWeek: number;
    textbookUsed: boolean;
    gradeReceived: string;
    writtenReview: string;
    score: number;

    constructor(private reviewService: ReviewService){
        reviewService.addReview();
    }
}