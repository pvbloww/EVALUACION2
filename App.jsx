import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Blogs from './pages/Blogs.jsx'
import DetalleBlog from './pages/DetalleBlog.jsx'
import Contacto from './pages/Contacto.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Carrito from './pages/Carrito.jsx'
import './App.css'
import './styles/Contenido.css'
import { StoreProvider } from './context/StoreContext.jsx'
import Admin from './pages/Admin.jsx'
import Ofertas from './pages/Ofertas.jsx'
import ResultadoCompra from './pages/ResultadoCompra.jsx'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Menu />
        <Container as="main" className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/compra/exitosa" element={<ResultadoCompra resultado="exitosa" />} />
            <Route path="/compra/fallida" element={<ResultadoCompra resultado="fallida" />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<DetalleBlog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<h1>Página no encontrada</h1>} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </StoreProvider>
  )
}
