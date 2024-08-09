import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './Views/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
