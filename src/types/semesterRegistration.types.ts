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
