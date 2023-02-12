import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./components/Home"
import LoginScreen from "./components/LoginScreen"
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App