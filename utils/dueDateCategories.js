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
    label: 'EOWeek',
    datetime: moment().endOf('week').subtract(1, 'days')
  },
  {
    label: 'EOWeekend',
    datetime: moment().endOf('week').add(1, 'days')
  },
  {
    label: 'EOMonth',
    datetime: moment().endOf('month')
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
