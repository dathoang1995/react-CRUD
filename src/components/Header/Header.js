import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import logo from '../../assets/images/logo192.png';
import { UserContext } from '../../context/UserContext';

function Header() {
    const { logout, user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="header-container">
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/">
                        <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth) ||
                            window.location.pathname === '/' ||
                            window.location.pathname === '/users') && (
                            <>
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                    <NavLink className="nav-link" to="/users ">
                                        Manage users
                                    </NavLink>
                                </Nav>

                                <Nav>
                                    {user && user.email && <span className="nav-link">welcome {user.email}</span>}
                                    <NavDropdown title="Setting">
                                        {user && user.auth === true ? (
                                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                        ) : (
                                            <NavLink to="/login" className="dropdown-item">
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
