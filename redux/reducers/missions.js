let initialState = [
  {
    id: 1,
    description: 'task1',
    category_id: 1,
    due_date: '2017-08-29'
  },
  {
    id: 2,
    description: 'task2',
    category_id: 1,
    due_date: '2017-08-27'
  },
  {
    id: 3,
    description: 'task3',
    category_id: 1,
    due_date: '2017-09-27'
  }
];

export function missions(state = initialState, action) {
  switch (action.type) {
    case 'POPULATE_MISSIONS':
      return action.missions;
    case 'ADD_NEW_MISSION':
      return [...state, action.new_mission];
    default:
      return state;
  }
}
