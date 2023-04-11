import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (pros) => {
   const account = useSelector((state) => state.user.account);
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const roles = {
      ADMIN: 1,
      "HUMAN RESOURCE": 2,
      "PROJECT MANAGER": 3,
      "GROUP LEADER": 4,
      STAFF: 5,
   };

   function getRoleId(roleName) {
      const check = roles[roleName];
      return check !== undefined ? check : 0;
   }
   // console.log(pros, "ABC", getRoleId(99));
   const flag = pros.acceptRole.includes(getRoleId(account.roleName));
   if (!flag) return <Navigate to="/error-authe"></Navigate>;
   if (isAuthenticated === false) {
      return <Navigate to="/login"></Navigate>;
   }
   return <>{pros.children}</>;
};

export default PrivateRoute;
