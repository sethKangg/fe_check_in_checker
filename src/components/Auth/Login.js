import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import { getTestAPI, postLogin } from "../../services/apiService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Login.scss";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = async () => {
      //api
      setLoading(true);

      let data = await postLogin(username, password);
      if (data) {
         toast.success("login success");
         setLoading(false);
         console.log("data ", data);
         navigate("/");
         dispatch(doLogin(data));
      }
      if (!data) {
         toast.error("fail");
      }
   };
   return (
      <div className="login-container">
         <div className="login-header">Welcome to Checkin Checker</div>
         <div className="login-title ">Checkin Checker</div>
         <div className="login-welcome ">Hello, who is this ?</div>
         <div className="login-content col-4 mx-auto d-flex flex-column gap-3 ">
            <div className="login-form form-group ">
               <label>Username</label>
               <input
                  type={"email"}
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="form-group ">
               <label>Password</label>
               <input
                  type={"password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <span className="forgot-password">Forgot password</span>
            <div>
               <button className="btn-submit" onClick={() => handleSubmit()} disabled={loading}>
                  Login
                  {loading == true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
               </button>
               <div className="text-center">
                  <span
                     className="back "
                     onClick={() => {
                        navigate("/");
                     }}
                  >
                     &#60;&#60; Homepage
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
