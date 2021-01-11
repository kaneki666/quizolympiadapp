import {GET_CLASSMATES} from '../reducers/types';

export const classMatesState = (state) => {
  return (dispatch) => {
    dispatch({
      type: GET_CLASSMATES,
      payload: state,
    });
  };
};
