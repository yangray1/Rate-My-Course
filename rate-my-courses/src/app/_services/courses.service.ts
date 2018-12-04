import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private API = 'https://rate-my-courses.herokuapp.com';
  private API = 'http://localhost:3000';
  private COURSE_API = this.API + '/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    // return this.allCourses.map(course => course.courseCode);
    return this.http.get<Course[]>(this.COURSE_API + '/getAllCourseCodes', this.getHttpHeaders());
    // get as list of strings TODO
  }

  // getAllCourseObjects(): Observable<Course[]> {
  //   return this.http.get<Course[]>(this.COURSE_API + '/getAllCourseCodes', this.getHttpHeaders());
  // }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.COURSE_API + '/save', newCourse, this.getHttpHeaders())
  }

  saveCourse(course: Course): Observable<Course> {
    // console.log(course);
    // const index = this.getAllCourses().indexOf(origCourse.courseCode);
    // if (index >= 0) {
    //   this.allCourses.splice(index, 1);
    // }
    // this.allCourses.push(course);
    console.log(course);
    return this.http.patch<Course>(this.COURSE_API + '/modifyCourse/' + course.courseCode, course, this.getHttpHeaders())
  }

  getCourse(courseCode: string): Observable<Course> {
    return this.http.get<Course>(this.COURSE_API + '/getCourseByCourseCode/' + courseCode, this.getHttpHeaders())
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
