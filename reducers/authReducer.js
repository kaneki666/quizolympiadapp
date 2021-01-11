import {AUTH_STATE_CHANGE, SAVE_USER_INFO, CHANGE_DARK_MODE} from './types';

const initialState = {
  isSigned: false,
  userinfo: '',
  darkmode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STATE_CHANGE:
      let {isSigned} = state;
      isSigned = action.payload;
      return {...state, isSigned: isSigned};
    case SAVE_USER_INFO:
      let {userinfo} = state;
      userinfo = action.payload;
      return {...state, userinfo: userinfo};
    case CHANGE_DARK_MODE:
      let {darkmode} = state;
      darkmode = action.payload;
      return {...state, darkmode: darkmode};
    default:
      return state;
  }
};
