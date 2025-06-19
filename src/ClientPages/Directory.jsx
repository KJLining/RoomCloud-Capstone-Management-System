import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import searchimg from '../ClientPages/images/Search1.png';
import { Link } from 'react-router-dom';

function Directory() {
  const { user } = useAuth();
  const [capstones, setCapstones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchCapstones();

    // Set up Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setSearchTerm(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          alert('No speech detected. Please try again and speak clearly.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert('Your browser does not support Speech Recognition. Try Google Chrome.');
    }
  }, []);

  const fetchCapstones = async () => {
    try {
      const res = await axios.get('http://localhost/roomcloud/getApprovedCapstones.php');
      setCapstones(res.data);
    } catch (error) {
      console.error('Failed to fetch capstones:', error);
    }
  };

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition already started');
      }
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSpeak = (title, author) => {
    const message = `Title: ${title}. Author: ${author}.`;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const filteredCapstones = capstones.filter((file) => {
    const matchSearch =
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.author1.toLowerCase().includes(searchTerm.toLowerCase());

    const matchYear = yearFilter
      ? new Date(file.upload_date).getFullYear().toString() === yearFilter
      : true;

    return matchSearch && matchYear;
  });

  return (
    <>
      <div className='col-12 d-flex justify-content-end align-items-center'>
        <Link to="/myprofile"><ion-icon name="person-outline" size="large" className='fw-light m-2 fs-4'></ion-icon></Link>
        <p>{user.name}</p>
        <Link to="/notifications"><ion-icon name="notifications-outline" className='ms-3 fs-4' size="large"></ion-icon></Link>
      </div>

      <div className='col-12 rounded rounded-3 p-3 mt-3 mb-3' style={{ backgroundColor: "#86A7FC" }}>
        <div className='row row-cols-2'>
          <div className='row align-content-center'>
            <h1 className='text-white'>Search</h1>
            <p className='fw-light text-white'>Find something that suits your capstone.</p>
          </div>
          <div className='row d-flex justify-content-end'>
            <img src={searchimg} style={{ width: "10rem", height: "8rem" }} alt="Search Icon" />
          </div>
        </div>
      </div>

      <div className="container my-3">
        <form className="row g-2 align-items-center" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search uploaded files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="col-md-2 d-flex gap-1">
            <button className="btn btn-primary w-50" onClick={handleStartListening} type="button">
              🎙️ Speak
            </button>
            <button className="btn btn-secondary w-50" onClick={handleStopListening} type="button">
              ⛔ Stop
            </button>
          </div>
        </form>
        {isListening && (
          <div className="mt-2 text-info fw-bold">
            Listening... Speak now!
          </div>
        )}
      </div>

      <div className="container">
        {filteredCapstones.length > 0 ? (
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCapstones.map((file) => (
                <tr key={file.id}>
                  <td>{file.title}</td>
                  <td>{file.author1}</td>
                  <td>{new Date(file.upload_date).toLocaleDateString()}</td>
                  <td className="d-flex flex-wrap gap-1">
                    <a
                      href={`http://localhost/roomcloud/${file.file_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </a>
                    <a
                      href={`http://localhost/roomcloud/download.php?file=${encodeURIComponent(file.file_name)}`}
                      className="btn btn-sm btn-success"
                    >
                      Download
                    </a>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleSpeak(file.title, file.author1)}
                    >
                      🔊 Speak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-4">No matching capstones found.</p>
        )}
      </div>
    </>
  );
}

export default Directory;
