// temporary service to mimic server-DB requests
import { storageService } from '../../services/async-storage.service';
import { groupService } from '../../services/group-service';
const STORAGE_KEY = 'group';

/*******************************************************************************************/

export function loadGroups() {
  return async (dispatch) => {
    try {
      const groups = await groupService.query();
      dispatch({ type: 'LOAD_GROUPS', groups });
    } catch (err) {
      console.log('Error loading groups:');
      console.error(err);
    }
  };
}

export function searchGroups(searchText) {
  return (dispatch, getState) => {
    const { groups } = getState().groupReducer;
    let filteredGroups = groups.filter((group) => {
      return (
        group.type.toLowerCase().includes(searchText.toLowerCase()) ||
        group.name.toLowerCase().includes(searchText.toLowerCase()) ||
        group.contactName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    dispatch({ type: 'SEARCH_GROUPS', filteredGroups });
  };
}

/**
 * save refers both to put and post requests
 * if volunteer has id, we know it is an update request,
 * else it is post. */
export function saveGroup(groupToSave) {
  return async (dispatch) => {
    try {
      const type = groupToSave._id ? 'UPDATE_GROUP' : 'ADD_GROUP';
      if (type === 'UPDATE_GROUP') {
        groupService.saveGroup(groupToSave);
      } else {
        groupToSave = await groupService.saveGroup(groupToSave);
      }
      dispatch({ type, group: groupToSave });
    } catch (err) {
      console.log('error adding volunteer', groupToSave);
      console.error(err);
    }
  };
}

export function removeGroup(groupId) {
  return async (dispatch) => {
    try {
      await storageService.remove(STORAGE_KEY, groupId);
      dispatch({ type: 'REMOVE_GROUP', groupId });
    } catch (err) {
      console.log('error removing group with ID:', groupId);
      console.error(err);
    }
  };
}
