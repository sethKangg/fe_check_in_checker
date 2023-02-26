import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
   const navigate = useNavigate();
   const handleLogin = () => {
      navigate('/login');
   };
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   const account = useSelector((state) => state.user.account);

   return (
      <Navbar bg='light' expand='lg'>
         <Container>
            <NavLink className='navbar-brand' to={'/'}>
               Công ty X
            </NavLink>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
               <Nav className='me-auto'>
                  <NavLink className='nav-link' to={'/'}>
                     Home
                  </NavLink>
                  <NavLink className='nav-link' to={'/users'}>
                     User
                  </NavLink>
                  <NavLink className='nav-link' to={'/admins'}>
                     Admin
                  </NavLink>
               </Nav>
               <Nav>
                  {isAuthenticated == false ? (
                     <>
                        <button
                           className='btn border-dark mx-2 p-2 border-2'
                           onClick={() => handleLogin()}
                        >
                           Log in
                        </button>

                        <button className='btn border-dark btn-info mx-2 p-2 border-2'>
                           Check in
                        </button>
                     </>
                  ) : (
                     <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.2'>Log out</NavDropdown.Item>
                     </NavDropdown>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
