import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  allCourses: Course[] = [
    {
      courseName: 'CSC309',
      courseDesc: 'Programming on the Web!'
    },
    {
      courseName: 'CSC373',
      courseDesc: 'A L G O R I T H M S'
    },
    {
      courseName: 'PHL245',
      courseDesc: 'BIRD'
    }
  ];

  constructor() { }

  getAllCourses(): string[] {
    return this.allCourses.map(course => course.courseName);
  }
}

export interface Course {
  courseName: string;
  courseDesc: string;
}
