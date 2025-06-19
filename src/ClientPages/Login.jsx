import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { textboxStyles } from './textboxStyles';
import fileSortingPicture from './images/folder-concept-illustration.png';
import Logo from './images/Room Cloud logo png.png';
import { useAuth } from '../context/AuthContext.jsx'; // Adjust path based on your folder structure

function Login() {
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const logoSize = {
    width: '5rem',
    height: '5rem',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/roomcloud/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user data in context + localStorage
        login(data.user); // `data.user` should include name/email/etc.
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
      
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row row-cols-2 vh-100'>
        <div className='col-12 col-md-4 flex-column justify-content-center'>
          <img src={Logo} className='mx-auto d-block mt-5 mb-4' style={logoSize} alt="Logo" />
          <h1 className='fw-bold text-center mb-5' style={{ color: '#FF9874' }}>Login to your account</h1>
          <form className='d-flex flex-column align-items-center justify-content-center' onSubmit={handleLogin}>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...textboxStyles.input, ...(email ? textboxStyles.inputFocusOrValid : {}) }} required />
              <label style={{ ...textboxStyles.labelline, ...(email ? textboxStyles.labelActive : {}) }}>
                Enter your email
              </label>
            </div>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ ...textboxStyles.input, ...(password ? textboxStyles.inputFocusOrValid : {}) }} required />
              <label style={{ ...textboxStyles.labelline, ...(password ? textboxStyles.labelActive : {}) }}>
                Enter your password
              </label>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <button type='submit' className='btn text-white fw-bold w-75 align-self-center rounded-3 mb-3' style={{ backgroundColor: "#FF9874" }}>Login</button>
            <Link to="/forgotpassword" className="text-center text-decoration-none mb-5">Forgot password?</Link>
            <p className="fw-light text-center d-md-none">Don't have an account?</p>
            <Link to="/signup" className='d-md-none btn btn-success border border-2 border-white fw-bold w-50 mb-5'>REGISTER NOW</Link>
          </form>

          <div className="footer text-center d-flex flex-row justify-content-evenly">
            <Link to="/joinus" className="text-decoration-none text-dark">Join Us</Link>
            <Link to="/privacy" className="text-decoration-none text-dark">Privacy Policy</Link>
            <Link to="/faq" className="text-decoration-none text-dark">FAQ</Link>
          </div>
          <p className="fw-light text-center mt-5">Room|Cloud 2024</p>
        </div>
        <div className='col-8 d-none d-md-flex flex-column bg-primary'>
          <h1 className="fw-bold text-light ms-5 mt-3">New Here?</h1>
          <h3 className="fw-light text-light ms-5">Signup for <span className="fw-bold">FREE!</span></h3>
          <Link to="/signup" className='btn btn-success border border-2 border-white fw-bold w-50 ms-5 mt-3'>REGISTER NOW</Link>
          <img src={fileSortingPicture} style={{ width: "35rem", height: "35rem" }} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;