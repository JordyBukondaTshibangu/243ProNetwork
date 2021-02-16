import React, { useState } from "react";
import FacebookIcon from "../../images/social1.png";
import InstagramIcon from "../../images/social2.png";
import GoogleIcon from "../../images/social3.png";
import TwitterIcon from "../../images/social4.png";
import PniterestIcon from "../../images/social5.png";
import EmailModal from "../../modals/EmailModal/EmailModal";

const ApplyJobSideBar = (props) => {
  let textLimit = (string = "sometext") => {
    let arrayTransform = string.split("");
    let filterText = arrayTransform.slice(0, 100);
    let resultText = filterText.join("");
    let newString = resultText.toString();
    return newString;
  };

  const style = {
    color: "#fff",
    backgroundColor: "#17a2b8",
    borderColor: "#17a2b8",
  };

  const {
    title,
    country,
    total_employee,
    email,
    overview,
    phone,
    address,
    authorEmail,
    applicantEmail,
  } = props;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="right-sidebar">
        <div className="widget widget-about bid-place">
          <button style={style} onClick={openModal}>
            Send email
          </button>
          <EmailModal
            showModal={showModal}
            closeModal={closeModal}
            authorEmail={authorEmail}
            applicantEmail={applicantEmail}
          />
        </div>
        <div className="widget widget-projectid">
          <h3>Job Position {title}</h3>
          <span></span>
          <p>Report Job</p>
        </div>
        <div className="widget widget-jobs">
          <div className="sd-title">
            <h3>About the Company</h3>
            <p> {textLimit(overview)} </p>
            <i className="la la-ellipsis-v"></i>
          </div>

          <div className="sd-title">
            <h4>{country}</h4>
            <p> {Date()}</p>
          </div>
          <div className="sd-title">
            <h4>Total number of employee {total_employee}</h4>
            <p>{}</p>
          </div>
          <div className="sd-title">
            <h4>Company Email</h4>
            <p>{email}</p>
          </div>
          <div className="sd-title">
            <h4>Company Phone</h4>
            <p>{phone}</p>
          </div>
          <div className="sd-title">
            <h4>Company Address</h4>
            <p>{address}</p>
          </div>
        </div>
        <div className="widget widget-jobs">
          <div className="sd-title">
            <h3>Share</h3>
          </div>
          <div className="sd-title copylink">
            <ul>
              <li>
                <img src={FacebookIcon} alt="pic" />{" "}
              </li>
              <li>
                <img src={TwitterIcon} alt="ima" />{" "}
              </li>
              <li>
                <img src={InstagramIcon} alt="ima" />{" "}
              </li>
              <li>
                <img src={GoogleIcon} alt="ima" />{" "}
              </li>
              <li>
                <img src={PniterestIcon} alt="ima" />{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobSideBar;
