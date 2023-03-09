import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT } from "../action/userAction";

const INITIAL_STATE = {
   account: {
      id: "",
      username: "",
      email: "",
      staffName: "",
      roleName: "",
      accessToken: "",
   },
   isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case FETCH_USER_LOGIN_SUCCESS:
         // console.log(">>>action: ", action);
         return {
            ...state,
            account: {
               id: action?.payload?.data?.accountDTO?.id,
               username: action?.payload?.data?.accountDTO?.username,
               email: action?.payload?.data?.accountDTO?.email,
               staffName: action?.payload?.data?.accountDTO?.staffName,
               roleName: action?.payload?.data?.accountDTO?.roleName,
               accessToken: action?.payload?.data?.accessToken,
            },
            isAuthenticated: true,
         };
      case USER_LOGOUT:
         return {
            ...state,
            account: {
               id: "",
               username: "",
               email: "",
               staffName: "",
               roleName: "",
               accessToken: "",
            },
            isAuthenticated: false,
         };
      default:
         return state;
   }
};
export default userReducer;
