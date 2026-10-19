import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import './Menu.css'
import { useStore } from '../hooks/useStore.js'

export default function Menu() {
  const { cantidad } = useStore()
  return (
    <Navbar expand="xl" collapseOnSelect className="menu border-bottom" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="menu-marca d-flex align-items-center gap-2">
          <span className="menu-logo" aria-hidden="true">🐾</span>
          Veterinaria San Marcos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir o cerrar menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav as="nav" aria-label="Navegación principal" className="mx-auto gap-xl-1">
            <Nav.Link as={NavLink} to="/" end eventKey="home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/productos" eventKey="productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas" eventKey="ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros" eventKey="nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs" eventKey="blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" eventKey="contacto">Contacto</Nav.Link>
          </Nav>
          <Nav as="nav" aria-label="Cuenta y carrito" className="menu-cuenta gap-xl-1">
            <Nav.Link as={NavLink} to="/login" eventKey="login">Iniciar sesión</Nav.Link>
            <Nav.Link as={NavLink} to="/registro" eventKey="registro">Registrar usuario</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" eventKey="carrito">
              <span aria-hidden="true">🛒</span> Carrito ({cantidad})
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin" eventKey="admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
