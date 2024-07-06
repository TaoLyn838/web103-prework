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

  return (
    <div>
      <NavBar />
      {routes}
    </div>
  )
}

export default App
