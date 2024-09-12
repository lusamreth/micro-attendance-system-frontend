
// helpers.ts
import { StudentData, Classroom } from './types';

export const calculateStatistics = (students: StudentData[]) => {
    let totalAbsent = 0;
    let totalPresent = 0;
    let totalLate = 0;

    students.forEach(({ attendance }) => {
        totalAbsent += attendance.absent_count;
        totalPresent += attendance.present_count;
        totalLate += attendance.late_count;
    });

    const totalClasses = students.length;
    const absenteeRate = ((totalAbsent / (totalPresent + totalAbsent + totalLate)) * 100).toFixed(2);

    return {
        totalAbsent,
        totalPresent,
        totalLate,
        absenteeRate
    };
};

export const findClassWithMostAbsentees = (students: StudentData[], classrooms: Classroom[]) => {
    const classAbsentMap: { [key: string]: number } = {};

    students.forEach(({ enrollments, attendance }) => {
        const className = enrollments[0]; // assuming one enrollment
        if (!classAbsentMap[className]) {
            classAbsentMap[className] = 0;
        }
        classAbsentMap[className] += attendance.absent_count;
    });

    const mostAbsentClass = Object.entries(classAbsentMap).reduce((max, entry) => {
        return entry[1] > max[1] ? entry : max;
    });

    return mostAbsentClass;
};
