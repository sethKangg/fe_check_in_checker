import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import { forgotPass, postLogin } from "../../services/apiService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Login.scss";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = async () => {
      if (!email) return toast.error("Email không được để trống");
      //api

      setLoading(true);
      let data = await forgotPass(email);
      if (data.status === 200) {
         toast.success("Đã gửi gửi mật khẩu mới đến mail của bạn vui lòng kiểm tra thư");
         setLoading(false);
         // console.log("data ", data);
      } else {
         setLoading(false);
         toast.error("Email không có trong hệ thống");
      }
   };

   const handleKeyDown = (e) => {
      if (e && e.key === "Enter") {
         handleSubmit();
      }
   };

   return (
      // <div className="login-container">
      //    <div className="login-header">Chào mừng đến với hệ thống Checkin-checker</div>
      //    <div className="login-title ">Checkin Checker</div>
      //    {/* <div className="login-welcome ">Hello, who is this ?</div> */}
      //    <div className="login-content col-4 mx-auto d-flex flex-column gap-3 ">
      // <div className="login-form form-group ">
      //    <label>Email</label>
      //    <input
      //       type={"email"}
      //       className="form-control mt-2"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //    />
      // </div>

      // <span className="forgot-password" onClick={() => navigate("/login")}>
      //    Quay về đăng nhập
      // </span>
      // <div>
      //    <button className="btn-submit" onClick={() => handleSubmit()} disabled={loading}>
      //       Gửi
      //       {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
      //    </button>
      //    <div className="text-center">
      //       <span
      //          className="back "
      //          onClick={() => {
      //             navigate("/");
      //          }}
      //       >
      //          &#60;&#60; Trang chủ
      //       </span>
      //    </div>
      // </div>
      //    </div>
      // </div>
      <div className="wr_lg ">
         <div className="container_lg d-flex">
            <div className="text-box">
               <p>Chào mừng đến với</p>
               <h1>CTS</h1>
               <h3>Website chấm công </h3>
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
                     Quên mật khẩu
                  </h3>
                  <div className="login-form form-group ">
                     <label>Email</label>
                     <input
                        type={"email"}
                        className="form-control mt-2"
                        value={email}
                        placeholder="Xin mời nhập Email "
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <span className="forgot-password" onClick={() => navigate("/login")}>
                     <label
                        style={{
                           cursor: "pointer",
                        }}
                     >
                        Quay về đăng nhập
                     </label>
                  </span>
                  <div>
                     <button
                        className="btn-submit"
                        onClick={() => handleSubmit()}
                        disabled={loading}
                     >
                        Gửi
                        {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default ForgotPassword;
