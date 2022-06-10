import { Link } from 'react-router-dom';

function NavBar({ user }) {
  return(
    <div className='NavBar'>

      <Link to='/'><h1>Board</h1></Link>

      <div className='Links'>

        <Link to ='/'>board</Link>
        /
        {user
        ?<Link to='/my'>my</Link>
        :<Link to='/signin'>sign in</Link>
        }

      </div>

    </div>
  )
}

export default NavBar;
