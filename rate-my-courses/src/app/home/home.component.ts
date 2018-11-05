import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  tiles: Tile[] = [
    {text: 'Find a Course', cols: 2, rows: 1, color: 'lightblue', link: ""},
    {text: 'Rate a Course', cols: 2, rows: 1, color: 'lightblue', link: ""},
    {text: 'Search for a Course', cols: 2, rows: 1, color: 'lightblue', link: "/search-course"},
    {text: '', cols: 2, rows: 1, color: '', link: ""},
    {text: 'My Ratings', cols: 2, rows: 1, color: 'lightblue', link: "/my-ratings"},
  ];

}
