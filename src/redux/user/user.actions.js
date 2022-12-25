import {UserActionTypes} from "./user.types"

export const setCurrentUser = (user) => {
  return {
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
  }
};

export const removeCurrentUser = (user) => {
  return {
  type: UserActionTypes.REMOVE_CURRENT_TYPE,
  payload: user,
  }
};
