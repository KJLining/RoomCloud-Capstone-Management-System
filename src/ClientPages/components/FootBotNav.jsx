import { Link } from "react-router-dom"
function FootBotNav(){
return(
<footer className="bg-light text-dark border-top">
      <div className="container py-4">
        <div className="row text-center text-md-start align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold">Room|Cloud</h5>
            <p className="mb-0">Empowering capstone collaboration and submission.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-4 mb-0">
              <li>
                <Link to="/joinus" className="text-decoration-none text-dark">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-decoration-none text-dark">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-decoration-none text-dark">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-center text-muted mb-0">
          &copy; {new Date().getFullYear()} Room|Cloud. All rights reserved.
        </p>
      </div>
    </footer>
)
}
export default FootBotNav