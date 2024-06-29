import { Link, Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
      </nav>
      <Outlet />
    </div>
  )
}
export default NavBar
