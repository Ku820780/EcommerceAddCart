// import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './components/Headers';
import './App.css';
import Home from './components/Home';
// import CardData from './components/CardData';
import CartDetails from './components/CartDetails';
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';




function App() {
  return (
    <>
    <Headers />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Cart1' element={<CartDetails/>} />
     </Routes>
     <Toaster />
    </>
  );
}

export default App;
