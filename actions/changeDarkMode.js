import {CHANGE_DARK_MODE} from '../reducers/types';

export const changeDarkMOde = (state) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_DARK_MODE,
      payload: state,
    });
  };
};
