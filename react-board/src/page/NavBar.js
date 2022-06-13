import { Link } from 'react-router-dom';
import $ from "jquery";

function NavBar({ user }) {

  function signout() {
    $.ajax({
      method: 'post',
      url: '/sign/out/'
    }).done(function(result){
      window.location = '/'
    })
  }

  return(
    <div className='NavBar'>

      <Link to='/'><h1>Board</h1></Link>

      <div className='Links'>
        <Link to ='/'>board</Link>/
        {user
        ?
        <>
          <Link to='/my'>my</Link>/
          <a onClick={ signout }>sign out</a>
        </>
        :<Link to='/signin'>sign in</Link>
        }
      </div>

    </div>
  )
}

export default NavBar;
