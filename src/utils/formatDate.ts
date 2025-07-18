import moment from 'moment';

export const formatDate = (date: string) => {
  const dateStr = date;
  const formattedDate = moment(dateStr).format('D MMMM'); // "15 January"
  console.log(formattedDate);

  return formattedDate;
};
