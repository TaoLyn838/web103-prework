import { Link, Outlet } from 'react-router-dom'
import header_img from '../assets/header_img.jpg'

const NavBar = () => {
  return (
    <div className="navbar-container">
      <header
        style={{
          backgroundImage: `url(${header_img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-screen-xl px-96 py-0.5 sm:px-6 sm:py-12 lg:px-8 xl:max-w-screen-2xl">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-9xl font-black text-gray-50 sm:text-5xl font-sans">
                CREATORVERSE
              </h1>

              <p className="mt-1.5 text-xl text-gray-300">
                Let's add a new creator!
              </p>
            </div>

            <nav className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-3.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
                to="/"
              >
                <span className="text-sm font-medium"> VIEW ALL CREATORS </span>
              </Link>
              <Link
                className="block rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                to="/add"
              >
                ADD A CREATOR
              </Link>
            </nav>
            <Outlet />
          </div>
        </div>
      </header>
    </div>
  )
}
export default NavBar
