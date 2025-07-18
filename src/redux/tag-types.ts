export const tagTypes = {
  semester: 'semester',
  academicFaculty: 'academicFaculty',
  semesterRegistration: 'semesterRegistration',
  users: 'users',
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const;

export const tagTypesList = [
  tagTypes.semester,
  tagTypes.academicFaculty,
  tagTypes.semesterRegistration,
  tagTypes.users,
  tagTypes.student,
  tagTypes.faculty,
  tagTypes.admin,
];
