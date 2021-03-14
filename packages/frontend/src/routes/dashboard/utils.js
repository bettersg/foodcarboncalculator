import moment from 'moment';

export const getWeek = (day) => {
  /* Sunday is 0, so change sunday to 7 */
  let dayOfWeek = moment(day).day() ? moment(day).day() : 7;
  let startOfWeek = moment(day)
    .add(1 - dayOfWeek, 'd')
    .format('D MMM');
  let endOfWeek = moment(day)
    .add(7 - dayOfWeek, 'd')
    .format('D MMM');
  return `${startOfWeek} - ${endOfWeek}`;
};
