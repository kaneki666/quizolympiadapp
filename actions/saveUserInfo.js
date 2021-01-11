import {SAVE_USER_INFO} from '../reducers/types';

export const saveUserInfo = (state) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_USER_INFO,
      payload: state,
    });
  };
};
