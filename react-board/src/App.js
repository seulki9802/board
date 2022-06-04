import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Board from './page/board/Board';
import Sign from './page/Sign';

import './App.css';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Links />

        <Routes>
          <Route path='/' element={ <Board /> } />
          <Route path='/sign' element={ <Sign /> } />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

function Links() {
  return(
    <div className='NavBar'>
      <h3>Board</h3>
      <Link to ='/'>///</Link>
      <Link to='/sigin'>sgsg</Link>
    </div>
  )
}

export default App;
