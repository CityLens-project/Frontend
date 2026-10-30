import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Overview from './Pages/Dashboard/Overview'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/overview" element={<Overview />} />
    </Routes>
  )
}