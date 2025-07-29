export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthOptions = months.map((item) => ({label: item, value: item}));

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const daysOptions = days?.map((day) => ({label: day, value: day}));

export const Gender = ['male', 'female', 'others'];
export const BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const sortOptionsAcademicFaculty = [
  {label: 'Default', value: ''},
  {label: 'Name ⬇', value: 'name'},
  {label: 'Name ⬆', value: '-name'},
];

export const sortOptionsDepartment = [
  {label: 'Default', value: ''},
  {label: 'Dept ⬇', value: 'name'},
  {label: 'Dept ⬆', value: '-name'},
];
