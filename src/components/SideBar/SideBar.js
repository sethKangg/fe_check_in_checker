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
import { FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink, FaHeart, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
// import sidebarBg from '../../assets/bg2.jpg';

const SideBar = (props) => {
   const { image, collapsed, toggled, handleToggleSidebar } = props;
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
               style={{
                  padding: "24px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
               }}
            >
               {"sidebarTitle"}
            </div>
         </SidebarHeader>

         <SidebarContent>
            <Menu iconShape="circle">
               <MenuItem
                  icon={<FaTachometerAlt />}
                  suffix={<span className="badge red">{"new"}</span>}
               >
                  Dashboard
               </MenuItem>
               <MenuItem icon={<FaGem />}> "components" </MenuItem>
            </Menu>
            <Menu iconShape="circle">
               <SubMenu
                  suffix={<span className="badge yellow"></span>}
                  title={"Quản lý tài khoản"}
                  icon={<FaRegLaughWink />}
               >
                  <MenuItem>
                     <Link to={"/admins"} />
                     Admin
                  </MenuItem>
                  <MenuItem>
                     Manage
                     <Link to={"/manage/manage-account"} />
                  </MenuItem>
                  <MenuItem>
                     <Link to={"/admins/dashboard"} />
                  </MenuItem>
               </SubMenu>
               <SubMenu
                  prefix={<span className="badge gray"></span>}
                  title="Staff Management"
                  icon={<FaHeart />}
               >
                  <MenuItem>
                     Manage
                     <Link to={"/manage/manage-staff"} />
                  </MenuItem>
               </SubMenu>
               <SubMenu title="XD" icon={<FaList />}>
                  <MenuItem> 1 </MenuItem>
                  <SubMenu title="EHE">
                     <MenuItem> 3.1 </MenuItem>
                     <SubMenu title="OHO">
                        <MenuItem> 3.3.1 </MenuItem>
                     </SubMenu>
                  </SubMenu>
               </SubMenu>
            </Menu>
         </SidebarContent>

         <SidebarFooter style={{ textAlign: "center" }}>
            <div
               className="sidebar-btn-wrapper"
               style={{
                  padding: "20px 24px",
               }}
            >
               <a
                  href="https://github.com/azouaoui-med/react-pro-sidebar"
                  target="_blank"
                  className="sidebar-btn"
                  rel="noopener noreferrer"
               >
                  <FaGithub />
                  <span
                     style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                     Source
                  </span>
               </a>
            </div>
         </SidebarFooter>
      </ProSidebar>
   );
};

export default SideBar;
