import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "./MainPostJob.css";
import { JobContext } from "../../contexts/jobContext";
import OnSuccessMessage from '../../feedback/SuccessMeesgae/SuccessMeesgae'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'

Modal.setAppElement("#root");

const MainPostJob = props => {

    const { addJob, onSuccess, onFailure } = useContext(JobContext);
    const { showModal, closeModal, company_email, company_name,  company_phone,  numberOfEmployee,  company_address,  company_about} = props;

  const  views = 0;  
  const applicants = 0;
  const [title, setTitile] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [author, setAuthor] = useState(company_name);
  const [email, setEmail] = useState(company_email);
  const [phone, setPhone] = useState(company_phone);
  const [content, setContent] = useState("");

  const [address, setAddress] = useState(company_address);
  const [overview, setOverview] = useState(company_about);
  const [total_employee, setTotal_employee] = useState(numberOfEmployee);  
 
    const handleSubmit = event => {
        event.preventDefault()
        const newCountry = `${country}  ${region}`
        addJob(title, applicants, jobType,salary,views, newCountry, author, email, phone, content, address,overview , total_employee)
    }

    const style = {
        color: "#fff",
        backgroundColor: "#17a2b8",
        borderColor: "#17a2b8"
      }

    return (
    
        <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapper">
        <div className="post-project">
            <h3>Post a Job</h3>
            <div className="post-project-fields">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Title" value={title} onChange={(event)=>{setTitile(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-6">
                            <div className="inp-field">
                                <select defaultValue="Full-time" onChange={event => {setJobType(event.target.value)}} required>
                                    <option>Job Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <textarea name="description" placeholder="Company Overview" value={overview }  onChange={(event)=>{setOverview(event.target.value)}} required></textarea>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Salary in ZAR" value={salary} onChange={(event)=>{setSalary(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-6">
                        <CountryDropdown
                            value={country}
                            onChange={(val) => setCountry(val)} 
                        />
                            <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => setRegion(val)} 
                        />
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Author" value={author} onChange={(event)=>{setAuthor(event.target.value)}} required readOnly/>
                        </div>
                        <div className="col-lg-6">
                            <input type="email"  placeholder="Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} required readOnly/>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Phone" value={phone} onChange={(event)=>{setPhone(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Address" value={address} onChange={(event)=>{setAddress(event.target.value)}} required/>
                        </div>
                        <div className="col-lg-6">
                            <input type="text"  placeholder="Number of employee" value={total_employee} onChange={(event)=>{setTotal_employee(event.target.value)}} required/>
                        </div>
                       
                        <div className="col-lg-6">
                            <textarea name="description" placeholder="Description" value={content }  onChange={(event)=>{setContent(event.target.value)}} required></textarea>
                        </div>
                        <div className="col-lg-12">
                            { 
                                onSuccess ? <OnSuccessMessage message = "Your Job was posted" /> : null
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

export default MainPostJob;
