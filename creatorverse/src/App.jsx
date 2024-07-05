import './App.css'
import { Route, Routes } from 'react-router-dom'
import Pages from './pages/index'
import NavBar from './components/NavBar'

function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Pages.ShowCreators />} />
      <Route path="/add" element={<Pages.AddCreator />} />
      <Route path="/edit/:id" element={<Pages.EditCreator />} />
      <Route path="/view/:id" element={<Pages.ViewCreator />} />
    </Routes>
  )

  const example_card = () => {
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      {routes}
    </div>
  )
}

export default App
