import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Board from './page/board/Board';
import SignIn from './page/sign/SignIn';
import SignUp from './page/sign/SignUp';

import './App.css';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Links />
        <Routes>
          <Route path='/' element={ <Board /> } />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/signup' element={ <SignUp /> } />
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
      <Link to='/signin'>sgsg</Link>
    </div>
  )
}

export default App;
