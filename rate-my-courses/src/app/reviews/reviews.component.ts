import { Component, OnInit } from '@angular/core';
import { REVIEWS } from '../hardcoded-reviews'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  allReviews = REVIEWS;

  constructor() { }

  ngOnInit() {
  }

}
