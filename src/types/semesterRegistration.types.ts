import type {TSemester} from './semester.type';

export type TSemesterRegistration = {
  _id: string;
  semester: TSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TSemesterRegistrationTable = Pick<
  TSemesterRegistration,
  'status' | 'semester' | '_id' | 'endDate' | 'maxCredit' | 'startDate'
>;

export const sortOptionsSemesterRegistration = [
  {label: 'Default', value: ''},
  {label: 'Status (A-Z)', value: 'status'},
  {label: 'Status (Z-A)', value: '-status'},
];

export const filterOptionsSemesterRegistration = [
  {label: 'UPCOMING', value: 'UPCOMING'},
  {label: 'ONGOING', value: 'ONGOING'},
  {label: 'ENDED', value: 'ENDED'},
];
