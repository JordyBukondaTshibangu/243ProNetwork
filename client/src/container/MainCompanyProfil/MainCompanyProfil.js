import React, { useState, useEffect } from "react";
import axios from 'axios'
import CompanySocialmedialink from "../../components/UserSocialMediaLink/SocialMediaLink";
import CompanyFeed from "../../components/UserFeed/UserFeed";
import CompanyInfo from "../../components/AnyCompanyInfo/AnyCompanyInfo";
import CompanyJob from "../../components/UserJob/UserJob";
import CompanyNotification from "../../components/UserNotification/UserNotification";
import CompanyPortfolio from "../../components/UserPortfolio/UserPortfolio";
import UpdateCompanyModal from "../../modals/UpdateCompany/UpdateCompany"
import DeleteAccountModal from '../../modals/DeleteConfirmModal/Company/DeleteCompanyConfirmModal'
import UserCover from '../../images/resources/cover-network.jpeg'
import FeedIcon from '../../images/ic1.png'
import InfoIcon from '../../images/ic2.png'
import PortfolioIcon from '../../images/ic3.png'
import NotificationIcon from '../../images/review.png'
import JobIcon from '../../images/ic6.png'


const MainCompanyProfil = () => {

    const userInformation = localStorage.getItem('user')
    const userDetails = JSON.parse(userInformation)
  
    const companyInformation = localStorage.getItem('company')
    const companyDetails = JSON.parse(companyInformation)

    const companyId = companyDetails.company_id
    
    const [ companyInfo, setCompanyInfo ] = useState({
        overview : "",
        awards : ""
    }) 
    const [ companySkills, setCompanySkills] = useState([])
    const [ companyPortfolio, setCompanyPortfolio] = useState([])
    const [ companySocialmedialink, setCompanySocialmedialink] = useState([])

    const [ feedToggle, setFeedToggle ] = useState(false)
    const [ infoToggle, setInfoToggle ] = useState(true)
    const [ portfolioToggle, setPortfolioeedToggle ] = useState(false)
    const [ notificationToggle, setNotificationToggle ] = useState(false)
    const [ jobToggle, setJobToggle ] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const openModal = () => {
      setShowModal(true)
    }
    const openDeleteModal = () => {
        setShowModalDelete(true)
    }
    const closeModal = () => {
      setShowModal(false)
      setShowModalDelete(false)
    }


    useEffect(() => {
        axios.get(`/company/${companyId}`)
            .then(res => {
                        
                let company = res.data.company
                const { overview, awards } = company.info
                const { skills } = company
                const { portfolio } = company
                const { socialmedialink } = company

                 
                    setCompanyInfo(prevState => {
                        return {...prevState,overview,awards}
                    }) 
                    setCompanySkills(skills)
                    setCompanyPortfolio([...companyPortfolio, portfolio]) 
                    setCompanySocialmedialink([...companySocialmedialink,socialmedialink])   
            })
    },[])

    const showFeed = () => {
        setFeedToggle(true)
        setInfoToggle(false)
        setPortfolioeedToggle(false)
        setNotificationToggle(false)
        setJobToggle(false)
    }
    const showInfo = () => {
        setFeedToggle(false)
        setInfoToggle(true)
        setPortfolioeedToggle(false)
        setNotificationToggle(false)
        setJobToggle(false)
    }
    const showPortfolio = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(true)
        setNotificationToggle(false)
        setJobToggle(false)
    }
    const showNotification = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(false)
        setNotificationToggle(true)
        setJobToggle(false)
    }
    const showJob = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(false)
        setNotificationToggle(false)
        setJobToggle(true)
    }
    
    return (

        <React.Fragment>
        <section className="cover-sec">
            <img src={UserCover} alt="" style={{maxWidth : '100%', height : '350px'}}/>
        </section>
		<main>
			<div className="main-section">
				<div className="container">
					<div className="main-section-data">
						<div className="row">
                                <CompanySocialmedialink 
                                        // socialmedialink = { companyDetails.companySocialmedialink } 
                                        company_name = { companyDetails.company_name}
                                        company_picture = { companyDetails.company_picture }
                                        company_country = { companyDetails.company_country }
                                        company_email = { companyDetails.company_email }
                                        company_phone = { companyDetails.company_phone }
                                        company_address = { companyDetails.company_address }
                                        company_id = { companyDetails.company_id}
                                />
                                <div className="col-lg-6">
                        <div className="main-ws-sec">

                            <div className="user-tab-sec rewivew">
                            <h3> { companyDetails.company}</h3>
                                        <div className="star-descp">
                                            <span>Established : { companyDetails.company_registered }</span>
                                        </div>
                                        
                                        <div className="tab-feed st2 settingjb">
                                            <ul>
                                            <li onClick={showInfo}>
                                                <img src={InfoIcon} alt="" />
                                                <span>Info</span>
                                            </li>

                                            <li  onClick={showFeed}>
                                                <img src={FeedIcon} alt="" />
                                                <span>Feed</span>
                                            </li>
                                            <li onClick={showPortfolio}>
                                                <img src={PortfolioIcon} alt="" />
                                                <span>Portfolio</span>
                                            </li>
                                            <li  onClick={showNotification}>
                                                <img src={NotificationIcon} alt="" />
                                                <span>Notificatio</span>
                                            </li>
                                            <li  onClick={showJob}>
                                                <img src={JobIcon} alt="" />
                                                <span>Job</span>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                { 
                                    infoToggle  ? <CompanyInfo 
                                                        overview={ companyInfo.overview }
                                                        skills = { companySkills }
                                                        location = { companyDetails.company_address }
                                                        country = { companyDetails.company_country}
                                                        awards = { companyInfo.awards}
                                                        
                                                        /> : 
                                    feedToggle ? <CompanyFeed 
                                                    email = { companyDetails.company_email }
                                                    companyDetails = { companyDetails }
                                                    userDetails = { userDetails} /> : 
                                    portfolioToggle ? <CompanyPortfolio 
                                                        companyPortfolio = {companyPortfolio}
                                                    /> :
                                    notificationToggle ? <CompanyNotification /> : 
                                    jobToggle ? <CompanyJob 
                                                    email = { companyDetails.company_email }/> : 
                                                <CompanyFeed  
                                                    email = { companyDetails.company_email }
                                                    companyDetails = { companyDetails }
                                                    userDetails = { userDetails}
                                                />
                                }
                            </div>
                            </div>
                            <div className="col-lg-3">
								<div className="right-sidebar">
									<div className="message-btn">
                                    <button className="btn btn-info" onClick={openModal}>
                                        <i className="fa fa-pencil"></i> Edit Profil 
                                    </button>
                                    <UpdateCompanyModal
                                        showModal={showModal}
                                        closeModal={closeModal}
                                        companyId = { companyDetails.company_id}
                                        overview  = { companyInfo.overview}
                                        country ={ companyDetails.company_country}
                                        awards = { companyInfo.awards}
                                        email  ={companyDetails.company_email}
                                        phone = {companyDetails.company_phone}
                                        address = {companyDetails.company_address}
                                        createdAt = {companyDetails.createdAt}
                                        company = { companyDetails.company_name}
                                        about = { companyDetails.company_about}
                                        total_number_employee = {companyDetails.total_number_employee}
                                        />
									</div>
                                    <CompanyPortfolio/>
                                    <div className="message-btn">
                                        <button className="btn btn-danger" onClick={openDeleteModal}>
                                            <i className="fa fa-trash"></i> Delete Account 
                                        </button>
                                        <DeleteAccountModal 
                                            showModal={showModalDelete}
                                            closeModal={closeModal}
                                            companyId = { companyDetails._id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </React.Fragment>
    );
}
 
export default MainCompanyProfil;
