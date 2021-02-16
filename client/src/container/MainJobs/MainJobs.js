import React, { useContext, useState} from 'react'
import FilterJob from '../../components/FilterJob/FilterJob'
import SingleJob from '../../components/SingleJob/SingleJob'
import PostJobModal from '../../modals/PostJobModal/MainPostJobModal'
import TopJob from '../../components/TopJobs/TopJobs'
import MostViewed from '../../components/MostViewd/MostView'
import { JobContext } from '../../contexts/jobContext'
import LoadingSpinner from '../../feedback/LoadingSpinner/LoadingSpinner'


const  MainJobs = props => {

    const { company_email, company_about, company_address, company_country, company_name, company_phone, total_number_employee, company_picture} = props.companyDetails
    
    const companyInformation = localStorage.getItem('company')
    const companyInfo = JSON.parse(companyInformation)
    console.log(companyInfo.company_email)


    
    const  { 
            jobs, loadingJobs, 
            topJobs, mostViewed , 
            loadingTopJobs, 
            loadingMostViewed,
            handleTitle, handleCountry, 
            handleFullTime, handlePartTime, 
            handlePostDuration

    } = useContext(JobContext)


    const [ showModal, setShowModal ] = useState(false)
    
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }    
    
    return (

        <main>
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row">
                            <FilterJob 
                                    handleTitle = { handleTitle }
                                    handlePartTime = { handlePartTime }
                                    handleFullTime = { handleFullTime }
                                    handlePostDuration = { handlePostDuration }
                                    handleCountry = { handleCountry }
                            />
                            <div className="col-lg-6">
                                <div className="main-ws-sec">
                                    
                                { companyInfo.company_email !== "" ? <div className="post-topbar">
                                    <div className="user-picy">
                                        <img src={company_picture} alt="" />
                                    </div>
                                    <div className="post-st">
                                        <ul>
                                            <li>
                                                <button className="btn btn-outline-info" onClick={openModal}>
                                                    Post a Job
                                                </button>
                                            </li>
                                        </ul>
                                    </div> 
                                </div> : null}
                                <PostJobModal 
                                    showModal={showModal}
                                    closeModal={closeModal}
                                    company_email = { company_email}
                                    company_country = { company_country}
                                    company_name = { company_name }
                                    company_phone = { company_phone}
                                    numberOfEmployee = { total_number_employee }
                                    company_address = { company_address}
                                    company_about = { company_about}
                                />
                                    <div className="posts-section">
                                        {
                                           !loadingJobs ? <LoadingSpinner/>: jobs.map(job => {
                                                
                                                let { _id, address, applicants, author, content, country, date,email, jobType, overview, phone, salary, socialmedialink, title, total_employee, views  } = job
                                                return (
                                                        <SingleJob 
                                                            key={job._id}
                                                            id = { _id}
                                                            address = { address }
                                                            applicants = { applicants}
                                                            author = { author}
                                                            content = { content}
                                                            country = { country}
                                                            date = { date}
                                                            email = { email}
                                                            jobType  = { jobType}
                                                            overview = { overview}
                                                            phone = { phone}
                                                            salary = { salary}
                                                            socialmedialink = { socialmedialink}
                                                            title = { title}
                                                            total_employee = { total_employee}
                                                            views = { views}
                                                        />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-3">
                            <div className="right-sidebar">
                                <TopJob topJobs={topJobs} loadingTopJobs={loadingTopJobs}/>
                                <MostViewed mostViewed={mostViewed} loadingMostViewed={loadingMostViewed}/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainJobs

