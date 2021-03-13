import moment from 'moment';

export const getWeek = (day) => {
  let startOfWeek = moment(day)
    .add(1 - moment(day).day(), 'd')
    .format('D MMM');
  let endOfWeek = moment(day)
    .add(7 - moment(day).day(), 'd')
    .format('D MMM');
  return `${startOfWeek} - ${endOfWeek}`;
};
