import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Details from './components/Details';
import Error from './components/Error';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/details' element={<Details/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
