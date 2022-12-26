import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand >EIP-897</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/proxy">Proxy</Nav.Link>
                        <Nav.Link as={Link} to="/logic1">Logic1</Nav.Link>
                        <Nav.Link as={Link} to="/logic2">Logic2</Nav.Link>
                        <Nav.Link as={Link} to="/proxyWlogic">ProxyWithLogic</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;