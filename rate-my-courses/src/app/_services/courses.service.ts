import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
      courseCode: 'CSC301',
      courseName: 'Intro to Soft Eng',
      courseDesc: 'C, more like SAD'
    },
    {
      courseCode: 'CSC369',
      courseName: 'Operating Systems',
      courseDesc: 'BIRD'
    },
    {
      courseCode: 'CSC207',
      courseName: 'Software Design',
      courseDesc: 'BIRD'
    },
    {
      courseCode: 'CSC236',
      courseName: 'Intro to Theory Comp',
      courseDesc: 'BIRD'
    },
    {
      courseCode: 'CSC258',
      courseName: 'Computer Organization',
      courseDesc: 'BIRD'
    },
    {
      courseCode: 'CSC209',
      courseName: 'Soft Tools and Sys Prog',
      courseDesc: 'BIRD'
    },
  ];

  private API = 'https://rate-my-courses.herokuapp.com';
  // private API = 'http://localhost:3000';
  private COURSE_API = this.API + '/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    // return this.allCourses.map(course => course.courseCode);
    return this.http.get<Course[]>(this.COURSE_API + '/getAllCourseCodes')//, this.getHttpHeaders());
    // get as list of strings TODO
  }

  // getAllCourseObjects(): Observable<Course[]> {
  //   return this.http.get<Course[]>(this.COURSE_API + '/getAllCourseCodes', this.getHttpHeaders());
  // }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.COURSE_API + '/save', newCourse)//, this.getHttpHeaders())
  }

  saveCourse(course: Course): Observable<Course> {
    // console.log(course);
    // const index = this.getAllCourses().indexOf(origCourse.courseCode);
    // if (index >= 0) {
    //   this.allCourses.splice(index, 1);
    // }
    // this.allCourses.push(course);
    return this.http.patch<Course>(this.COURSE_API + '/modify/' + course.courseCode, course)//, this.getHttpHeaders())
  }

  getCourse(courseCode: string): Observable<Course> {
    return this.http.get<Course>(this.COURSE_API + '/getCourseByCourseCode/' + courseCode)//, this.getHttpHeaders())
  }

  getCourseDesc(course: Course) {
    return course.courseDesc
  }

  private getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken') || ''
      })
    };
  }


}

export interface Course {
  courseCode: string;
  courseName: string;
  courseDesc: string;
}
