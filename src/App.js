import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/DashBoard/DashBoard';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
