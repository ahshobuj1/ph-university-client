export type TSemester = {
  _id: string;
  name: string;
  code: number;
  year: string;
  startMonth: string;
  endMonth: string;
};

export type TSemesterTable = Pick<
  TSemester,
  'name' | 'code' | 'year' | 'startMonth' | 'endMonth'
>;
