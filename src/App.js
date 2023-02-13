import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState }  from "react";
import './App.css'
import Home from "./components/Home"
import LoginScreen from "./components/LoginScreen"
 
function App() {
  const [data, setData] = useState();

  function get_data(newData) {
    setData(newData);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen data={get_data}/>} />
        <Route path="/home" element={<Home data={data}/>} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App