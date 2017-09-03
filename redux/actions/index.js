export function populateMissions(missions) {
  return {
    type: 'POPULATE_MISSIONS',
    missions
  };
}

export function addNewMission(new_mission) {
  return {
    type: 'ADD_NEW_MISSION',
    new_mission
  };
}

export function removeMission(mission_id) {
  return {
    type: 'REMOVE_MISSION',
    mission_id
  }
}
