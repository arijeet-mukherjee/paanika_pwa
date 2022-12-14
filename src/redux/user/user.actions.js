import { SIGN_IN } from "./user.types";

export const setCurrentUser = (user) => {
  return {
  type: SIGN_IN,
  payload: user,
  }
};
