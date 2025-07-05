export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAcademicFacultyTable = Pick<TAcademicFaculty, '_id' | 'name'>;
