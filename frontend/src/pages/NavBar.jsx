
import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Cafeteria Portal
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          Home
        </Link>

        <Link
          to="/register"
          className={`nav-link ${
            location.pathname === '/register' ? 'active' : ''
          }`}
        >
          Register
        </Link>

        <Link
          to="/login"
          className={`nav-link ${
            location.pathname === '/login' ? 'active' : ''
          }`}
        >
          Login
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
