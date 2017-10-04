import { combineReducers } from 'redux';
import { mission_ids, missions_by_id } from './missions';

const rootReducer = combineReducers({
    mission_ids,
    missions_by_id
  });

export default rootReducer;
