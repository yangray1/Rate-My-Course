import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  allCourses: Course[] = [
    {
      courseCode: 'CSC309',
      courseName: 'Prog on the Web',
      courseDesc: 'Learn to program on the weeb'
    },
    {
      courseCode: 'CSC373',
      courseName: 'Algo Design & Analysis',
      courseDesc: 'A L G O R I T H M S'
    },
    {
      courseCode: 'PHL245',
      courseName: 'Mod Symbolic Logic',
      courseDesc: 'BIRD'
    },
    {
      courseCode: 'CSC209',
      courseName: 'Soft Tools & Sys Prog',
      courseDesc: 'C, more like SAD'
    }
  ];

  constructor() { }

  getAllCourses(): string[] {
    return this.allCourses.map(course => course.courseCode);
  }

  getAllCourseObjects(): Course[] {
    return this.allCourses;
  }

  addCourse(newCourse: Course) {
    this.allCourses.push(newCourse);
  }

  saveCourse(course: Course, origCourse: Course) {
    console.log(course);
    const index = this.getAllCourses().indexOf(origCourse.courseCode);
    if (index >= 0) {
      this.allCourses.splice(index, 1);
    }
    this.allCourses.push(course);
  }

  getCourseDesc(courseName: string): string {
    return this.allCourses.filter(course => course.courseCode === courseName)[0].courseName;
  }
}

export interface Course {
  courseCode: string;
  courseName: string;
  courseDesc: string;
}
