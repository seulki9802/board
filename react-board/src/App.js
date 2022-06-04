import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Board from './page/BoardHead';
import Posts from './page/Board';
import Sign from './page/Sign';
import './App.css';

function App() {

  return (
    <div className="App">
      <Board />

      <BrowserRouter>
        <Link to ='/'>///</Link>
        <Link to='/sigin'>sgsg</Link>
        
        <Routes>
          <Route path='/' element={ <Posts /> } />
          <Route path='/sign' element={ <Sign /> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
