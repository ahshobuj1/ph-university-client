export const semesterNameCode: Record<string, string> = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semesterName = ['Autumn', 'Summer', 'Fall'];

const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((item) => ({
  value: (currentYear + item).toString(),
}));
