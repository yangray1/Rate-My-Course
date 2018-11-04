export class User {
    firstName: string;
    lastName: string;
    username: string;
    yearOfStudy: number;
    programOfStudy: string[];
    password: string;
    isAdmin: boolean;

    constructor(
        firstName: string,
        lastName: string,
        username: string,
        yearOfStudy: number,
        programOfStudy: string[],
        password: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.yearOfStudy = yearOfStudy;
        this.programOfStudy = programOfStudy;
        this.password = password;
        this.isAdmin = false;
    }
}
