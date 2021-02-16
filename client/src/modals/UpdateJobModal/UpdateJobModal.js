import React, {  useState, useContext } from "react";
import Modal from "react-modal";
import "./UpdateJobModal.css";
import { JobContext } from "../../contexts/jobContext";
import OnSuccessMessage from '../../feedback/UpdateMessage/UpdateMessage'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'



Modal.setAppElement("#root");

const UpdateUserModal = props => {

    const { updateJob, onSuccess, onFailure } = useContext(JobContext)

    const { showModal, closeModal, jobId, title, jobType, salary, country, author, email, phone, content, address, overview , total_employee} = props

    const [job_title, setTitile] = useState(title);
    const [job_jobType, setJobType] = useState(jobType);
    const [job_salary, setSalary] = useState(salary);
    const [job_country, setCountry] = useState(country);
    const [job_author, setAuthor] = useState(author);
    const [job_email, setEmail] = useState(email);
    const [job_phone, setPhone] = useState(phone);
    const [job_content, setContent] = useState(content);
    const [job_address, setAddress] = useState(address);
    const [job_overview, setOverview] = useState(overview);
    const [job_total_employee, setTotal_employee] = useState(total_employee);
  
    const handleSubmit = (event) => {
          event.preventDefault()
          updateJob(jobId,job_title, job_jobType, job_salary, job_country, job_author, job_email, job_phone, job_content, job_address,job_overview , job_total_employee)
    }
  
    const style = {
          color: "#fff",
          backgroundColor: "#17a2b8",
          borderColor: "#17a2b8"
    }
  
      return (
          <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapper">
          <div className="post-project">
              <h3>Edit a Job</h3>
              <div className="post-project-fields">
                  <form onSubmit={handleSubmit}>
                      <div className="row">
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Title" value={job_title} onChange={(event)=>{setTitile(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <div className="inp-field">
                                  <select defaultValue={job_jobType} onChange={event => {setJobType(event.target.value)}} required>
                                      <option>Job Type</option>
                                      <option value="Full-time">Full-time</option>
                                      <option value="Part-time">Part-time</option>
                                  </select>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <textarea name="description" placeholder="Company Overview" value={job_overview }  onChange={(event)=>{setOverview(event.target.value)}} required></textarea>
                          </div>
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Salary in ZAR" value={job_salary} onChange={(event)=>{setSalary(event.target.value)}} required/>
                          </div>
  
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Country" value={job_country} onChange={(event)=>{setCountry(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Author" value={job_author} onChange={(event)=>{setAuthor(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <input type="email"  placeholder="Email" value={job_email} onChange={(event)=>{setEmail(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Phone" value={job_phone} onChange={(event)=>{setPhone(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Address" value={job_address} onChange={(event)=>{setAddress(event.target.value)}} required/>
                          </div>
                          <div className="col-lg-6">
                              <input type="text"  placeholder="Number of employee" value={job_total_employee} onChange={(event)=>{setTotal_employee(event.target.value)}} required/>
                          </div>
                         
                          <div className="col-lg-6">
                              <textarea name="description" placeholder="Description" value={job_content }  onChange={(event)=>{setContent(event.target.value)}} required></textarea>
                          </div>
                          <div className="col-lg-12">
                            { 
                                onSuccess ? <OnSuccessMessage message = "Your Job was updated" /> : null
                            }
                            {
                                onFailure ? <OnFailureMessage message = "Oupss, something went wrong" /> : null 
                            }
                        </div>
                          <div className="col-lg-6">
                              <ul>
                                  <li><button style={style} type="submit" value="post">Post</button></li>
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

export default UpdateUserModal;
