export function mission_ids(state = [], action) {
  switch (action.type) {
    case 'POPULATE_MISSIONS':
      return action.missions.map(mission => mission.id);
    case 'ADD_NEW_MISSION':
      return [...state, action.new_mission.id];
    case 'REMOVE_MISSION':
      return state.filter((id) => id !== action.mission_id);
    default:
      return state;
  }
}

export function missions_by_id(state = {}, action) {
  switch (action.type) {
    case 'POPULATE_MISSIONS':
      let missions_by_id = action.missions.reduce((accum, mission) => {
        accum[mission.id] = mission;
        return accum;
      }, {});
      return Object.assign({}, state, missions_by_id);
    case 'ADD_NEW_MISSION':
      return Object.assign({}, state, {
        [action.new_mission.id]: action.new_mission
      });
    case 'REMOVE_MISSION':
      delete state[action.mission_id];
      return Object.assign({}, state);
    case 'UPDATE_MISSION_DUE_DATE':
      let mission_to_update = state[action.mission_id];
      let updated_mission = Object.assign(
        {}, mission_to_update, { due_date: action.due_date }
      );
      return Object.assign({}, state, { [action.mission_id]: updated_mission });
    default:
      return state;
  }
}
