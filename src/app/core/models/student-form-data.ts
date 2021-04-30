import { Student } from "./student";

export interface StudentFormData {
    toUpdate: boolean;
    student: Student;
}