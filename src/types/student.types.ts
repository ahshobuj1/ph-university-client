export type TStudentRoot = {
  password?: string;
  student: TStudent;
};

export type TStudent = {
  id: string;
  name: Name;
  age: number;
  semester: string;
  department: string;
  email: string;
  contact: string;
  fatherName: string;
  motherName: string;
  fatherContact: string;
  matherContact: string;
  gender: string;
  blood?: string;
  profileImage?: string;
  permanentAddress: PermanentAddress;
  localAddress: LocalAddress;
};

export interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface PermanentAddress {
  village?: string;
  postOffice: string;
  policeStation: string;
  town: string;
}

export interface LocalAddress {
  village?: string;
  postOffice: string;
  policeStation: string;
  town: string;
}
