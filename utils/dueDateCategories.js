import moment from 'moment';

export const dueDateCategories = [
  {
    label: 'Overdue',
    datetime: moment()
  },
  {
    label: 'EOD',
    datetime: moment().endOf('day')
  },
  {
    label: 'EODTomorrow',
    datetime: moment().add(1, 'day').endOf('day')
  },
  {
    label: 'EOWeek',
    datetime: moment().endOf('week').subtract(1, 'days')
  },
  {
    label: 'EOWeekend',
    datetime: moment().endOf('week').add(1, 'days')
  },
  {
    label: 'In2Weeks',
    datetime: moment().add(2, 'weeks').endOf('day')
  },
  {
    label: 'EOMonth',
    datetime: moment().endOf('month')
  },
  {
    label: 'In1Month',
    datetime: moment().add(1, 'month').endOf('day')
  },
  {
    label: 'In2Months',
    datetime: moment().add(2, 'months').endOf('day')
  },
  {
    label: 'EOYear',
    datetime: moment().endOf('year')
  },
  {
    label: 'Eventually',
    datetime: null
  },
];
