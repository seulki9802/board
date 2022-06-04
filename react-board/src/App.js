import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Head from './page/BoardHead';
import Board from './page/board/Board';
import Sign from './page/Sign';
import './App.css';

function App() {

  return (
    <div className="App">
      <Head />

      <BrowserRouter>
        <Link to ='/'>///</Link>
        <Link to='/sigin'>sgsg</Link>
        
        <Routes>
          <Route path='/' element={ <Board /> } />
          <Route path='/sign' element={ <Sign /> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
