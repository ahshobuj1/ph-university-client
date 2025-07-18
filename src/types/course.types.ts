export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PreRequisiteCourse = {
  course: TCourse[];
  isDeleted: boolean;
};
