import { Link } from 'react-router-dom';
import { useState } from 'react';
import { textboxStyles } from './textboxStyles';
import fileSortingPicture from './images/folder-concept-illustration.png';
import Logo from './images/Room Cloud logo png.png';

function ForgotPassword2(){
    const logoSize ={
    width: '5rem',
    height: '5rem',
  };
    const [createPass, setcreatePass]=useState('');
    const [password, setPassword] = useState('');
    return(
            <>
    <div className='container-fluid'>
      <div className='row row-cols-2 vh-100'>
        <div className='col-12 col-md-4 flex-column justify-content-center'>
          <img src={Logo} className='mx-auto d-block mt-5 mb-4' style={logoSize}></img>
          <h1 className='fw-bold text-center mb-5' style={{color: '#FF9874'}}>Forgot Password</h1>
          <form className='d-flex flex-column align-items-center justify-content-center'>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="password" value={createPass} onChange={(e) => setcreatePass(e.target.value)} style={{...textboxStyles.input,...(setcreatePass ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(createPass ? textboxStyles.labelActive : {}),}}>
                    Create Password
                </label>
            </div>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{...textboxStyles.input,...(password ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(password ? textboxStyles.labelActive : {}),}}>
                    Confirm Password
                </label>
            </div>
            <a type='submit' className='btn text-white fw-bold w-75 align-self-center rounded-3 mb-3' style={{backgroundColor:"#FF9874"}}>Reset Password</a>
            <p className="fw-light text-center d-md-none">Don't have an account?</p>
            <Link to="/signup" className='d-md-none btn btn-success border border-2 border-white fw-bold w-50 mb-5'>REGISTER NOW</Link>
            
          </form>
          <div className="footer text-center d-flex flex-row justify-content-evenly">
            <Link to="/joinus" className="text-decoration-none text-dark">Join Us</Link>
            <Link to="/privacy" className="text-decoration-none text-dark">Privacy Policy</Link>
            <Link to="/faq" className="text-decoration-none text-dark">FAQ</Link>
          </div>
          <p class="fw-light text-center mt-5">Room|Cloud 2024</p>
        </div>
        <div className='col-8 d-none d-md-flex flex-column bg-primary'>
          <h1 className="fw-bold text-light ms-5 mt-3">New Here?</h1>
          <h3 className="fw-light text-light ms-5">Signup for <span className="fw-bold">FREE!</span></h3>
          <Link to="/signup" className='btn btn-success border border-2 border-white fw-bold w-50 ms-5 mt-3'>REGISTER NOW</Link>
          <img src={fileSortingPicture}style={{width:"35rem", height:"35rem"}}/>
        </div>
      </div>
    </div>
    </>
    )
}
export default ForgotPassword2