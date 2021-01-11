import {AUTH_STATE_CHANGE} from '../reducers/types';

export const changeAuthState = (state) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_STATE_CHANGE,
      payload: state,
    });
  };
};
