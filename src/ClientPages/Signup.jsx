import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { textboxStyles } from './textboxStyles';
import fileSortingPicture from './images/folder-concept-illustration.png';
import Logo from './images/Room Cloud logo png.png';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
function Signup(){
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = {
    firstName,
    lastName,
    course: selectedCourse,
    sex: selectedSex,
    yearLevel: selectedYear,
    studentNumber,
    email,
    password: createPass,
  };

  try {
    const res = await fetch("http://localhost/roomcloud/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    if (data.success) {
      alert("Registered successfully!");
      navigate("/");
    } else {
      alert("Error: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Network error: " + err.message);
  }
};
    const logoSize ={
        width: '5rem',
        height: '5rem',
        };
      const [firstName, setfirstName] = useState('');
      const [lastName, setlastName] = useState('');
      const [studentNumber, setstudentNumber] = useState('');
      const [email, setEmail] = useState('');
      const [createPass, setcreatePass]=useState('');
      const [password, setPassword] = useState('');
      const [selectedCourse, setSelectedCourse] = useState('');
      const [selectedSex, setSelectedSex] = useState('');
      const [selectedYear, setSelectedYear] = useState('');
          
      const [showCourse, setShowCourse] = useState(false);
      const [showSex, setShowSex] = useState(false);
      const [showYear, setShowYear] = useState(false);
      
return(
    <>
    <div className='container-fluid'>
      <div className='row row-cols-2 vh-100'>
        <div className='col-12 col-md-4 flex-column justify-content-center'>
          <img src={Logo} className='mx-auto d-block mt-5 mb-4' style={logoSize}></img>
          <h1 className='fw-bold text-center mb-5' style={{color: '#FF9874'}}>Signup</h1>
          <form className='d-flex flex-column align-items-center justify-content-center' onSubmit={handleSubmit}>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} style={{...textboxStyles.input,...(firstName ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(firstName ? textboxStyles.labelActive : {}),}}>
                    First Name
                </label>
            </div>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} style={{...textboxStyles.input,...(lastName ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(lastName ? textboxStyles.labelActive : {}),}}>
                    Last Name
                </label>
            </div> 
            <div className="d-flex flex-row justify-content-evenly mb-3">
              {/* Course Dropdown */}
              <div className="dropdown me-3 position-relative">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle border-2 border-black"
                  onClick={() => {
                    setShowCourse(!showCourse);
                    setShowSex(false);
                    setShowYear(false);
                  }}
                >
                  {selectedCourse || 'Course'}
                </button>
                {showCourse && (
                  <ul className="dropdown-menu show position-absolute mt-1" style={{ zIndex: 999 }}>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCourse('BSIT');
                          setShowCourse(false);
                        }}
                      >
                        BSIT
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCourse('BSCS');
                          setShowCourse(false);
                        }}
                      >
                        BSCS
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            
              {/* Sex Dropdown */}
              <div className="dropdown me-3 position-relative">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle border-2 border-black"
                  onClick={() => {
                    setShowSex(!showSex);
                    setShowCourse(false);
                    setShowYear(false);
                  }}
                >
                  {selectedSex || 'Sex'}
                </button>
                {showSex && (
                  <ul className="dropdown-menu show position-absolute mt-1" style={{ zIndex: 999 }}>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedSex('Male');
                          setShowSex(false);
                        }}
                      >
                        Male
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedSex('Female');
                          setShowSex(false);
                        }}
                      >
                        Female
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            
              {/* Year Level Dropdown */}
              <div className="dropdown me-3 position-relative">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle border-2 border-black"
                  onClick={() => {
                    setShowYear(!showYear);
                    setShowSex(false);
                    setShowCourse(false);
                  }}
                >
                  {selectedYear || 'Year Level'}
                </button>
                {showYear && (
                  <ul className="dropdown-menu show position-absolute mt-1" style={{ zIndex: 999 }}>
                    {[1, 2, 3, 4].map((year) => (
                      <li key={year}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedYear(year.toString());
                            setShowYear(false);
                          }}
                        >
                          {year}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="text" value={studentNumber} onChange={(e) => setstudentNumber(e.target.value)} style={{...textboxStyles.input,...(studentNumber ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(studentNumber ? textboxStyles.labelActive : {}),}}>
                    Student Number
                </label>
            </div>   
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{...textboxStyles.input,...(email ? textboxStyles.inputFocusOrValid : {}),}} required/>
                <label style={{...textboxStyles.labelline,...(email ? textboxStyles.labelActive : {}),}}>
                    Enter your email
                </label>
            </div>
            <div style={textboxStyles.entryarea} className="mb-4 w-75">
                <input type="password" value={createPass} onChange={(e) => setcreatePass(e.target.value)} style={{...textboxStyles.input,...(lastName ? textboxStyles.inputFocusOrValid : {}),}} required/>
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
            <p className="text-center d-md-none">Already have an account? <Link to="/"className="text-decoration-none">Login Here.</Link></p>           
            <button type='submit' className='btn text-white fw-bold w-75 align-self-center rounded-3 mb-3' style={{backgroundColor:"#FF9874"}}>Register</button>
          </form>
          <div className="footer text-center d-flex flex-row justify-content-evenly">
            <Link to="/joinus" className="text-decoration-none text-dark">Join Us</Link>
            <Link to="/privacy" className="text-decoration-none text-dark">Privacy Policy</Link>
            <Link to="/faq" className="text-decoration-none text-dark">FAQ</Link>
          </div>
          <p className="fw-light text-center mt-5">Room|Cloud 2024</p>
        </div>
        <div className='col-8 d-none d-md-flex flex-column bg-primary'>
          <h3 className="fw-light text-light ms-5 mt-3">Already have an account?</h3>
          <Link to="/" className='btn btn-success border border-2 border-white fw-bold w-50 ms-5 mt-3'>LOGIN HERE</Link>
          <img src={fileSortingPicture}style={{width:"35rem", height:"35rem"}}/>
        </div>
      </div>
    </div>
    </>
)
}
export default Signup