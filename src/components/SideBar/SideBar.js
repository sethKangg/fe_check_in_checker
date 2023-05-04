import "react-pro-sidebar/dist/css/styles.css";
import {
   ProSidebar,
   Menu,
   MenuItem,
   SubMenu,
   SidebarHeader,
   SidebarFooter,
   SidebarContent,
} from "react-pro-sidebar";
import "./SideBar.scss";
import { FaTachometerAlt, FaGem, FaRegLaughWink, FaHeart, FaList } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import sidebarBg from '../../assets/bg2.jpg';

const SideBar = (props) => {
   const { image, collapsed, toggled, handleToggleSidebar } = props;
   const navigate = useNavigate();
   const account = useSelector((state) => state.user.account);

   return (
      <ProSidebar
         // image={image ? sidebarBg : false}
         collapsed={collapsed}
         toggled={toggled}
         breakPoint="md"
         onToggle={handleToggleSidebar}
      >
         <SidebarHeader>
            <div
               onClick={() => navigate("/")}
               style={{
                  padding: "24px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
               }}
            >
               {"CTS"}
            </div>
         </SidebarHeader>

         <SidebarContent>
            {/* <Menu iconShape="circle">
               <MenuItem
                  icon={<FaTachometerAlt />}
                  suffix={<span className="badge red">{"new"}</span>}
               >
                  Dashboard
               </MenuItem>
               <MenuItem icon={<FaGem />}> "components" </MenuItem>
            </Menu> */}
            <Menu iconShape="circle">
               {account.roleName === "Admin" && (
                  <SubMenu
                     suffix={<span className="badge yellow"></span>}
                     title={"Admin"}
                     icon={<FaRegLaughWink />}
                  >
                     <MenuItem>
                        Quản lý tài khoản
                        <Link to={"/manage/manage-account"} />
                     </MenuItem>
                  </SubMenu>
               )}
               {account.roleName === "Human resource" && (
                  <>
                     <SubMenu
                        prefix={<span className="badge gray"></span>}
                        title="Human Resource"
                        icon={<FaHeart />}
                     >
                        <MenuItem>
                           Quản lý nhân viên
                           <Link to={"/manage/manage-staff"} />
                        </MenuItem>
                     </SubMenu>

                     <SubMenu title="Ảnh" icon={<FaList />}>
                        <MenuItem>
                           Tổng hợp ảnh chụp
                           <Link to={"/manage/view-capture"} />
                        </MenuItem>
                     </SubMenu>
                  </>
               )}
            </Menu>
         </SidebarContent>

         <SidebarFooter style={{ textAlign: "center", cursor: "pointer" }}>
            <div
               className="sidebar-btn-wrapper"
               style={{
                  padding: "20px 24px",
               }}
               onClick={() => navigate("/")}
            >
               <AiFillHome />
               {/* <span
                  style={{
                     whiteSpace: "nowrap",
                     textOverflow: "ellipsis",
                     overflow: "hidden",
                     width: "20px",
                  }}
               >
                  Trang chủ
               </span> */}
            </div>
         </SidebarFooter>
      </ProSidebar>
   );
};

export default SideBar;
