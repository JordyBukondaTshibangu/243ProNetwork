import React, { useState } from "react";
import Modal from "react-modal";
import "./EmailModal.css";
import OnSuccessMessage from '../../feedback/UpdateMessage/UpdateMessage'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'
import axios from 'axios'

Modal.setAppElement("#root");

const EmailModal = props => {
  const { showModal, closeModal, authorEmail, applicantEmail, jobId, jobApplicants } = props;

  const [title, setTitile] = useState("JOB APPLICATION");
  const [email, setEmail] = useState(applicantEmail);
  const [content, setContent] = useState(
     `Good day\n 
      I hope this message finds you well ! \n
      I am applying for this position ! \n
      Thanks \n
      Regards
      ` 
  );
  const [ onSuccess, setOnSuccess] = useState(false)
  const [ onFailure, setOnFailure] = useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault();
    const emailObject = {
      senderemail : email,
      recipientEmail : authorEmail,
      title,
      content 
    }

    const applicants = jobApplicants + 1

    const updatedJob = { applicants }

        try {
              await axios.post('/apply-job', emailObject)

              await axios.patch(`/jobs/${jobId}`, updatedJob)

              setOnSuccess(true)
              setTimeout(() => setOnSuccess(false), 15000)
              
        }catch(error) {
           
            setOnFailure(true)
            setTimeout(() => setOnFailure(false), 15000)
        }
    }
  const style = {
    color: "#fff",
    backgroundColor: "#17a2b8",
    borderColor: "#17a2b8",
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      className="modal-wrapper"
    >
      <div className="post-project">
        <h3>Send email</h3>
        <div className="post-project-fields">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <input
                  className="form-control form-control-sm"
                  type="email"
                  placeholder="To"
                  value={authorEmail}
                  readOnly
                  required
                />
              </div>

              <div className="col-lg-12">
                <input
                  className="form-control form-control-sm"
                  type="email"
                  placeholder="From"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-12">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Subject"
                  value={title}
                  onChange={(event) => {
                    setTitile(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-12">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Message"
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  required
                ></textarea>
              </div>
              <div className="col-lg-12">
                  { 
                      onSuccess ? <OnSuccessMessage message = "Your email was sent" /> : null
                  }
                  {
                      onFailure ? <OnFailureMessage message = "Oupss, something went wrong" /> : null 
                  }
              </div>
              <div className="col-lg-12">
                <ul>
                  <li>
                    <button style={style} type="submit" value="post">
                      Send
                    </button>
                  </li>
                  {
                      onSuccess ?  <li><button className= "btn btn-primary danger" onClick={closeModal}>Close</button></li> : 
                                  <li><button className= "btn btn-primary danger" onClick={closeModal}>Cancel</button></li>
                  }
                </ul>
              </div>
            </div>
          </form>
        </div>
        <a href="/" title="">
          <i className="la la-times-circle-o"></i>
        </a>
      </div>
    </Modal>
  );
};

export default EmailModal;
