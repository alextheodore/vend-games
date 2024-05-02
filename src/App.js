import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Start from './pages/start';
import Form from './pages/form';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='form' element={<Form/>}/>
    </Routes>
  )
}

export default App;
