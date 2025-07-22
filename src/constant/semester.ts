export const semesterNameCode: Record<string, string> = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semesterName = ['Autumn', 'Summer', 'Fall'];

export const semesterNameOptions = semesterName.map((item) => ({
  label: item,
  value: item,
}));

const currentYear = new Date().getFullYear();

export const years = [0, 1, 2, 3, 4].map((item) => {
  return (currentYear + item).toString();
});

export const yearOptions = years.map((item) => ({
  label: item,
  value: item,
}));
