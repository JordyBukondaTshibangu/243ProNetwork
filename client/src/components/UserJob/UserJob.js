import React, { useState, useEffect} from 'react'
import { useConfirm } from "material-ui-confirm";
import IconCountry from '../../images/icon9.png'
import IconLike from '../../images/liked-img.png'
import IconClock from '../../images/clock.png'
import { Link } from 'react-router-dom'
import IconUser from '../../images/resources/us-pc2.png'
import UpdateJobModal from '../../modals/UpdateJobModal/UpdateJobModal'
import LoadingSpinner from '../../feedback/LoadingSpinner/LoadingSpinner'
import axios from 'axios'

const Userjobs = props => {

const confirm = useConfirm();
const { email } = props 
 
const [jobs, setJobs] = useState([
    {
      _id: "",
      title: "",
      jobType: "",
      salary: 0,
      views: 0,
      country: "",
      author: "",
      email: "",
      phone: "",
      content: "",
      overview: "",
      total_employee: 0,
      date: "",
      address: "",
      applicants: 0,
      socialmedialink: [],
    }
  ])
const [loading , setLoading] = useState(true)
const [showModal, setShowModal] = useState(false)


const openModal = () => {
      setShowModal(true)
}
const closeModal = () => {
      setShowModal(false)
}

useEffect(() => {
    axios.get(`/jobs/my-jobs?email=${email}`) 
          .then(res => {
            const fetchedJobs = res.data.jobs
            setJobs(fetchedJobs)
            setLoading(false)
          })

  }, [])

  let jobsList = jobs.reverse()

  const handleDelete = (jobId, title) => {
    confirm({ description: `This will permanently delete ${title} job.` })
      .then(() => {
        axios.delete(`/jobs/${jobId}`)
        .then(res => {
          const newJobsList = jobs.filter(job => job._id !== jobId)
          setJobs(newJobsList)
        })
      })
  };

  if(loading){
    return <LoadingSpinner />
  }else {
    return (
      jobsList.map(job => {
        return (
          <div key={job._id}>
          <div className="posty">
              <div className="post-bar no-margin">
                  <div className="post_topbar">
                      <div className="usy-dt">
                          <img src={IconUser} alt=""/>
                          <div className="usy-name">
                              <h3>{job.author}</h3>
                              <span><img src={IconClock} alt=""/> posted on : { job.date }</span>
                          </div>
                      </div>
                      <div className="ed-opts">
                            <button className="btn btn-info" style={{borderRadius : '100%'}} onClick={openModal}><i className="fa fa-pencil fa-fw"></i> </button>
                            <button className="btn btn-danger" style={{borderRadius : '100%'}} onClick={() => handleDelete(job._id, job.title)}><i className="fa fa-trash-o fa-lg"></i></button>
                            <UpdateJobModal  
                                showModal={showModal} 
                                closeModal={closeModal}
                                jobId={job._id}
                                title={job.title} 
                                applicants={job.applicants} 
                                jobType={job.jobType}
                                salary={job.salary}
                                views={job.views} 
                                country={job.country} 
                                author={job.author} 
                                email={job.email} 
                                phone={job.phone} 
                                content={job.content} 
                                address={job.address}
                                overview ={job.overview} 
                                total_employee={job.total_employee}
                            />
                      </div>
                  </div>
                  <div className="epi-sec">
                      <ul className="descp">
                          <li><img src={IconCountry} alt=""/><span> { job.country }</span></li>
                      </ul>
                  </div>
                  <div className="job_descp">
                      <h3>{job.title}</h3>
                      <ul className="job-dt">
                          <li><a href="/jobs" title="">{job.jobType}</a></li>
                          <li><span>R {job.salary}</span></li>
                      </ul>
                      <p>
                          {job.content}
                      </p>
                      <ul className="skill-tags">
                          {
                              job.socialmedialink.map((socialLink,index) => {
                                  return <li key={index}><Link to={socialLink}> {socialLink} </Link></li>
                              })
                          }
                      </ul>
                  </div>
                  <div className="job-status-bar">
                      <ul className="like-com">
                          <li> <img src={IconLike} alt="liked"/> </li>
                          <li> <i className="fas fa-eye"> {job.views} </i> </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="process-comm">
              
          </div>
      </div>
        )
      })
    )
  }
}
 
export default Userjobs;







 