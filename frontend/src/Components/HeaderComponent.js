import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderComponent = () => {
    const currentUrl = useLocation();

    const logoutAndClearData = () => {
        deleteCookie('encryption_token');
        deleteLocalStorage('encryption_token');
    };

    const deleteLocalStorage = (name) => {
        localStorage.removeItem(name);
    };

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const logout = () => {
        logoutAndClearData();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">Transect</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {currentUrl?.pathname !== '/' && (
                        <Nav>
                            {localStorage.getItem('encryption_token') ? (
                                <LinkContainer to="/">
                                    <Nav.Link onClick={() => logout()}>
                                        Logout
                                    </Nav.Link>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to="/">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;
