import {GET_CHALLENGER, GET_CLASSMATES, GET_LEADERBOARD} from './types';

const initialState = {
  classmates: '',
  leaderboard: '',
  challenger: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSMATES:
      let {classmates} = state;
      classmates = action.payload;
      return {...state, classmates: classmates};

    case GET_LEADERBOARD:
      let {leaderboard} = state;
      leaderboard = action.payload;
      return {...state, leaderboard: leaderboard};

    case GET_CHALLENGER:
      let {challenger} = state;
      challenger = action.payload;
      return {...state, challenger: challenger};

    default:
      return state;
  }
};
