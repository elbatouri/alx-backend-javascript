export default function updateStudentGradeByCity(arr, city, newGrades) {
  return arr
    // Filter students by the provided city
    .filter((el) => el.location === city)
    // Map over the filtered students to update their grades
    .map((person) => {
      // Filter newGrades to get the grade for the current student
      const grades = newGrades.filter((el) => el.studentId === person.id);
      // If a grade is found, use it, otherwise set grade to 'N/A'
      const grade = grades.length ? grades[0].grade : 'N/A';
      // Return an updated object with the new grade
      return {
        ...person,
        grade,
      };
    });
}
