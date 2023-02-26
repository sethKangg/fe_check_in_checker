import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
   account: {
      accessToken: '',
      email: '',
      role: '',
   },
   isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case FETCH_USER_LOGIN_SUCCESS:
         console.log(action);
         return {
            ...state,
            account: {
               accessToken: '',
               email: '',
               role: '',
            },
            isAuthenticated: true,
         };
      default:
         return state;
   }
};
export default userReducer;
