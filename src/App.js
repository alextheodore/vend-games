import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Start from './pages/start';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
    </Routes>
  )
}

export default App;
