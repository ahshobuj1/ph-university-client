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

export const sortOptionsSemester = [
  {label: 'Default', value: ''},
  {label: 'Name (A-Z)', value: 'name'},
  {label: 'Name (Z-A)', value: '-name'},
  {label: 'Year (Low to High)', value: 'year'},
  {label: 'Year (High to Low)', value: '-year'},
];
