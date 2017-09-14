import moment from 'moment';

export function generateNotificationTimes(due_date) {
  const now = moment();
  // consider eventually where due_date is null
  const hours_between_now_and_due_date = due_date.diff(now, 'hours');
  return [
    {
      description: 'day_of',
      range_start: 1,
      range_end: 3,
    },
    {
      description: 'day_of',
      range_start: 4,
      range_end: 6,
    },
    {
      description: 'day_of',
      range_start: 7,
      range_end: 9,
    },
    {
      description: 'day_of',
      range_start: 10,
      range_end: 12,
    },
    {
      description: 'day_of',
      range_start: 13,
      range_end: 16,
    },
    {
      description: 'one_day_before',
      range_start: 25,
      range_end: 30,
    },
    {
      description: 'one_day_before',
      range_start: 31,
      range_end: 35,
    },
    {
      description: 'one_day_before',
      range_start: 36,
      range_end: 39,
    },
    {
      description: 'week_before',
      range_start: 49, // 2 days before
      range_end: 63,
    },
    {
      description: 'week_before',
      range_start: 73, // 3 days before
      range_end: 87,
    },
    {
      description: 'week_before',
      range_start: 97, // 4 days before
      range_end: 111,
    },
    {
      description: 'week_before',
      range_start: 121, // 5 days before
      range_end: 135,
    },
    {
      description: 'week_before',
      range_start: 145, // 6 days before
      range_end: 159,
    },
    {
      description: 'week_before',
      range_start: 169, // 7 days before
      range_end: 183,
    },
    {
      description: 'two_weeks_before',
      range_start: 217, // 9 days before
      range_end: 231,
    },
    {
      description: 'two_weeks_before',
      range_start: 265, // 11 days before
      range_end: 279,
    },
    {
      description: 'two_weeks_before',
      range_start: 313, // 13 days before
      range_end: 327,
    },
    {
      description: 'month_before',
      range_start: 409, // 17 days before
      range_end: 423,
    },
    {
      description: 'month_before',
      range_start: 505, // 21 days before
      range_end: 519,
    },
    {
      description: 'month_before',
      range_start: 601, // 25 days before
      range_end: 615,
    },
    {
      description: 'month_before',
      range_start: 697, // 29 days before
      range_end: 711,
    },
    {
      description: '60_days_before',
      range_start: 697, // 36 days before
      range_end: 711,
    },
    {
      description: '60_days_before',
      range_start: 865, // 43 days before
      range_end: 879,
    },
    {
      description: '60_days_before',
      range_start: 1033, // 50 days before
      range_end: 1047,
    },
    {
      description: '60_days_before',
      range_start: 1201, // 57 days before
      range_end: 1215,
    },
    {
      description: 'greater_60_days_before',
      range_start: 1537, // 71 days before
      range_end: 1551,
    },
    {
      description: 'greater_60_days_before',
      range_start: 1873, // 85 days before
      range_end: 1887,
    },
    {
      description: 'greater_60_days_before',
      range_start: 2209, // 99 days before
      range_end: 2223,
    },
    {
      description: 'greater_60_days_before',
      range_start: 2545, // 113 days before
      range_end: 2559,
    },
    {
      description: 'greater_60_days_before',
      range_start: 2881, // 127 days before
      range_end: 2895,
    },
    {
      description: 'greater_60_days_before',
      range_start: 3217, // 141 days before
      range_end: 3231,
    },
  ].reduce((accum, notif_obj) => {
    if (notif_obj.range_end < hours_between_now_and_due_date) {
      // sample some hour between range
      const random_hour = Math.floor(
        Math.random() * (notif_obj.range_end - notif_obj.range_start + 1)
      ) + notif_obj.range_start;
      const cloned_due_date = due_date.clone();
      notification_time = cloned_due_date.subtract(random_hour, 'hours');
      accum.push(notification_time);
    }

    return accum;
  }, [])


      // // start reminders at 930AM ending at 11PM
      // // EOD (<24hrs): remind every 4hrs
      // if (sec_between_now_and_due_date >= 864000) {
      //   // consider when a EOD is selected and is past one of these times
      //   let n = due_date.subtract(3, 'hours'); // 9PM due date
      //   let n_minus_1 = due_date.subtract(6, 'hours'); // 6PM
      //   let n_minus_2 = due_date.subtract(9, 'hours'); // 3PM
      //   let n_minus_3 = due_date.subtract(12, 'hours'); // 12PM
      // }
      // // EODTomorrow (24 - 48hrs): remind every 8hrs
      // if () {
      //   let n_minus_4 = due_date.subtract(30, 'hours'); // 6PM day before due
      //   let n_minus_5 = due_date.subtract(36, 'hours'); // 12PM day before
      // }
      // // EOWeek (2 - 7days): remind once a day
      // if () {
      //   // 48hrs + 12hrs
      //   let n_minus_6 = due_date.subtract(60, 'hours'); // 12PM 3days before
      //   let n_minus_7 = due_date.subtract(84, 'hours'); // 12PM 4days before
      //   let n_minus_8 = due_date.subtract(108, 'hours'); // 12PM 5days before
      //   let n_minus_9 = due_date.subtract(132, 'hours'); // 12PM 6days before
      //   let n_minus_10 = due_date.subtract(156, 'hours'); // 12PM 7days before
      // }
      // // (<14days): remind once every two days
      // if () {
      //
      // }
      // // (<30days): remind every 4 days
      // // (31 - 60 days): every 7 days
      // // (>61): every 14 days
}

// generateNotificationTime(prevNotificationDateTime, due_date, hours_to_subtract) {
//   // create new notifcation time
//   const new_notification_time = prevNotificationDateTime.subtract(
//     hours_to_subtract, 'hours'
//   );
//   if (due_date.isBefore(new_notification_time) &&
//     new_notification_time.isBetween(/* 930AM and 1130PM that day */)
//   ) {
//     // add notification time to accum
//     // call recursion
//     generateNotificationTime(new_notification_time, due_date, hours_to_subtract);
//   }
// }
