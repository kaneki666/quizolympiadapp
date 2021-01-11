import {GET_LEADERBOARD} from '../reducers/types';

export const leaderboardStates = (state) => {
  return (dispatch) => {
    dispatch({
      type: GET_LEADERBOARD,
      payload: state,
    });
  };
};
