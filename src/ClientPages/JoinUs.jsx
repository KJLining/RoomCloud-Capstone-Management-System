import joinUsPic from './images/join.png';

function JoinUs() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="card m-4 w-100 border-2 border-dark rounded-5" style={{ maxWidth: "50rem" }}>
        <div className="card-header border-0">
          <h2 className="fw-light text-center">Join Us</h2>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="d-flex justify-content-center flex-shrink-0">
              <img src={joinUsPic} className="img-fluid" style={{ maxHeight: "300px", objectFit: "contain" }} alt="Join us" />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <p>
                Welcome to Room|Cloud, the ultimate online space for effortless file sharing! Join us today to experience a seamless way to store, share, and collaborate on your important files. Whether you're working with colleagues, sharing memories with friends, or managing your personal documents, Room|Cloud offers a secure and user-friendly platform that makes it all simple and efficient. Sign up now and start sharing with ease!
              </p>
            <div className="row mt-3 g-3">
              <div className="col-12 col-md-6">
                <h4 className="fw-bold d-flex align-items-center gap-2">
                  <ion-icon name="mail"></ion-icon>Email
                </h4>
                <p className="text-info-emphasis">mail.roomcloud@email.com</p>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="fw-bold d-flex align-items-center gap-2">
                  <ion-icon name="call"></ion-icon>Phone
                </h4>
                <p className="text-info-emphasis">14-12354-110</p>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="fw-bold d-flex align-items-center gap-2">
                  <ion-icon name="logo-facebook"></ion-icon>Facebook
                </h4>
                <p className="text-info-emphasis">Room|Cloud</p>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="fw-bold d-flex align-items-center gap-2">
                  <ion-icon name="logo-instagram"></ion-icon>Instagram
                </h4>
                <p className="text-info-emphasis">@Room.Cloud</p>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="fw-bold d-flex align-items-center gap-2">
                  <ion-icon name="logo-discord"></ion-icon>Discord
                </h4>
                <p className="text-info-emphasis">Room|Cloud</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
