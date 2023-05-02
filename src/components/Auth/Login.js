import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import { postLogin } from "../../services/apiService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Login.scss";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const toMain = () => {
      navigate("/");
   };
   if (isAuthenticated) return <Navigate to="/"></Navigate>;
   const handleSubmit = async () => {
      //api
      setLoading(true);

      let data = await postLogin(username, password);
      if (data.status === 200) {
         toast.success("Đăng nhập vào tài khoản thành công");
         setLoading(false);
         // console.log("data ", data);
         dispatch(doLogin(data));
      } else {
         setLoading(false);
         // toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
         Object.values(data.data.error).map((item, index) => {
            // msgToast += item + "\n";
            toast.error(item);
         });
      }
   };

   const handleKeyDown = (e) => {
      if (e && e.key === "Enter") {
         handleSubmit();
      }
   };

   return (
      // <div className="login-container">
      //    <div className="login-header">Chào mừng đến với hệ thống CTS </div>
      //    <div className="login-title ">CTS</div>
      //    <div className="login-welcome ">
      //       Trang đăng nhập dành cho các loại tài khoản: Admin, Human resources, Group leader,
      //       Project manager, Staff
      //    </div>
      //    <div className="login-content col-4 mx-auto d-flex flex-column gap-3 ">
      //       <div className="login-form form-group ">
      //          <label>Tên tài khoản</label>
      //          <input
      //             type={"email"}
      //             className="form-control"
      //             value={username}
      //             onChange={(e) => setUsername(e.target.value)}
      //          />
      //       </div>
      //       <div className="form-group ">
      //          <label>Mật khẩu</label>
      //          <input
      //             type={"password"}
      //             className="form-control"
      //             value={password}
      //             onChange={(e) => setPassword(e.target.value)}
      //             onKeyDown={(e) => handleKeyDown((e) => handleKeyDown(e))}
      //          />
      //       </div>
      //       <span className="forgot-password" onClick={() => navigate("/forgot-password")}>
      //          Quên mật khẩu ?
      //       </span>
      //       <div>
      //          <button className="btn-submit" onClick={() => handleSubmit()} disabled={loading}>
      //             Đăng nhập
      //             {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
      //          </button>
      //          <div className="text-center">
      //             <span
      //                className="back "
      //                onClick={() => {
      //                   navigate("/");
      //                }}
      //             >
      //                &#60;&#60; Quay về trang chủ
      //             </span>
      //          </div>
      //       </div>
      //    </div>
      // </div>
      <div className="wr_lg ">
         <div className="container_lg d-flex">
            <div className="text-box w-50 m-auto">
               <p>Chào mừng đến với</p>
               <h1>CTS</h1>
               <h3>Hệ thống quản lý chấm công </h3>
               <div className="lg_row">
                  <p onClick={() => navigate("/")}>Trang chủ</p>
                  <p onClick={() => navigate("/check_in")}>Điểm danh</p>
               </div>
            </div>
            <div className="lg_right w-100 m-auto">
               <div className="login-content col-4 mx-auto d-flex flex-column gap-3 ">
                  <h3
                     style={{
                        color: "#fff",
                        fontSize: "35px",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "600",
                     }}
                  >
                     Đăng nhập
                  </h3>
                  <div className="login-form form-group ">
                     <label>Tên tài khoản</label>
                     <input
                        type={"email"}
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
                  <div className="form-group ">
                     <label>Mật khẩu</label>
                     <input
                        type={"password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown((e) => handleKeyDown(e))}
                     />
                  </div>
                  <span className="forgot-password" onClick={() => navigate("/forgot-password")}>
                     <label
                        style={{
                           cursor: "pointer",
                        }}
                     >
                        Quên mật khẩu ?
                     </label>
                  </span>
                  <div>
                     <button
                        className="btn-submit"
                        onClick={() => handleSubmit()}
                        disabled={loading}
                     >
                        Đăng nhập
                        {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
                     </button>
                     {/* <div className="text-center">
                        <span
                           className="back "
                           onClick={() => {
                              navigate("/");
                           }}
                        >
                           &#60;&#60; Quay về trang chủ
                        </span>
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
