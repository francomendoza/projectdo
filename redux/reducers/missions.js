export function missions(state = [], action) {
  switch (action.type) {
    case 'POPULATE_MISSIONS':
      return action.missions;
    case 'ADD_NEW_MISSION':
      return [...state, action.new_mission];
    case 'REMOVE_MISSION':
      return state.filter(({id}) => id !== action.mission_id);
    default:
      return state;
  }
}
