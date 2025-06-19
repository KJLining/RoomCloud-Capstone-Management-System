import { Link } from 'react-router-dom';
import Logo from '../images/Room Cloud logo png.png';
function FooterNav(){
return(
<nav className="navbar fixed-top navbar-expand-md" style={{backgroundColor:"#3468C0"}}>
    <div className="container-fluid">
        <div className="navbar-brand text-white fw-light">
            <img src={Logo} style={{height:"2.5rem",width:"2.5rem"}} className='align-text-center me-1'/>
             Room|Cloud
        </div>
        <button className='navbar-toggler btn-outline-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse flex-row-reverse' id='navbarNavAltMarkup'>
            <div className='navbar-nav me-md-4 align-items-center'>
                <Link to="/" aria-current="page" className='nav-link me-md-4 text-white'>Login</Link>
                <Link to="/signup" className='nav-link me-md-4 text-white'>Sign Up</Link>
            </div>
        </div>
    </div>
</nav>
)
}
export default FooterNav