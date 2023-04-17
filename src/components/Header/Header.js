import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";

const Header = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleLogin = () => {
      navigate("/login");
   };
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const account = useSelector((state) => state.user.account);
   const handleLogOut = () => {
      console.log("Logout");
      dispatch(doLogOut());
      toast.success("Đăng xuất thành công");
      navigate("/login");
   };

   return (
      <Navbar bg="light" expand="lg">
         <Container>
            <NavLink className="navbar-brand" to={"/"}>
               Checkin Checker
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <NavLink className="nav-link" to={"/"}>
                     Trang chủ
                  </NavLink>
                  {account.roleName === "Human resource" || account.roleName === "Admin" ? (
                     <NavLink className="nav-link" to={"/manage"}>
                        Quản lý
                     </NavLink>
                  ) : null}
                  {isAuthenticated && (
                     <NavLink className="nav-link" to={`/calendar`}>
                        Lịch
                     </NavLink>
                  )}
                  {account.roleName === "Human resource" ||
                  account.roleName === "Project manager" ? (
                     <NavLink className="nav-link" to={"/project"}>
                        Dự án
                     </NavLink>
                  ) : null}
                  {account.roleName === "Human resource" || account.roleName === "Group Leader" ? (
                     <NavLink className="nav-link" to={"/group"}>
                        Nhóm
                     </NavLink>
                  ) : null}
                  {isAuthenticated && (
                     <NavLink className="nav-link" to={"/report"}>
                        Yêu cầu
                     </NavLink>
                  )}
                  {account.roleName === "Human resource" && (
                     <NavLink className="nav-link" to={"/monthly-report"}>
                        Báo cáo tháng
                     </NavLink>
                  )}
               </Nav>
               <Nav>
                  {isAuthenticated == false ? (
                     <>
                        <button
                           className="btn border-dark mx-2 p-2 border-2"
                           onClick={() => handleLogin()}
                        >
                           Đăng nhập
                        </button>

                        <button className="btn border-dark btn-info mx-2 p-2 border-2">
                           Điểm danh
                        </button>
                     </>
                  ) : (
                     <NavDropdown
                        title={account.staffName + " - " + account.roleName}
                        id="basic-nav-dropdown"
                     >
                        <NavDropdown.Item onClick={() => navigate(`/profile/${account.username}`)}>
                           Thông tin tài khoản
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogOut()}>
                           Đăng xuất
                        </NavDropdown.Item>
                     </NavDropdown>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
