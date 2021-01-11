import {GET_CHALLENGER} from '../reducers/types';

export const getChallenger = (state) => {
  return (dispatch) => {
    dispatch({
      type: GET_CHALLENGER,
      payload: state,
    });
  };
};
