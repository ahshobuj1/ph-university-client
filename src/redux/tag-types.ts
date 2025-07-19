export const tagTypes = {
  semester: 'semester',
  academicFaculty: 'academicFaculty',
  semesterRegistration: 'semesterRegistration',
  users: 'users',
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
  department: 'department',
  course: 'course',
  courseFaculty: 'courseFaculty',
  offeredCourse: 'offeredCourse',
  enrolledCourse: 'enrolledCourse',
} as const;

export const tagTypesList = [
  tagTypes.semester,
  tagTypes.academicFaculty,
  tagTypes.semesterRegistration,
  tagTypes.users,
  tagTypes.student,
  tagTypes.faculty,
  tagTypes.admin,
  tagTypes.department,
  tagTypes.course,
  tagTypes.courseFaculty,
  tagTypes.offeredCourse,
  tagTypes.enrolledCourse,
];
