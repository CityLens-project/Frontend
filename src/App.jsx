import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Login from './Pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}