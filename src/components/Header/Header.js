import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand href='#home'>
                    Công ty X
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Link
                            className='nav-link'
                            to={'/'}
                        >
                            Home
                        </Link>
                        <Link
                            className='nav-link'
                            to={'/users'}
                        >
                            User
                        </Link>
                        <Link
                            className='nav-link'
                            to={'/admins'}
                        >
                            Admin
                        </Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title='Dropdown'
                            id='basic-nav-dropdown'
                        >
                            <NavDropdown.Item href='#action/3.1'>
                                Log in
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.2'>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.2'>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
