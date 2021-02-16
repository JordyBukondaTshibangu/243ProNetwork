import React, { useState, useEffect } from "react";
import axios from 'axios'
import UsersSocialMediaLinks from "../../components/UserSocialMediaLink/SocialMediaLink";
import UserFeed from "../../components/UserFeed/UserFeed";
import UserInfo from "../../components/AnyUserInfo/AnyUserInfo";
import UserNotification from "../../components/UserNotification/UserNotification";
import UserPortfolio from "../../components/UserPortfolio/UserPortfolio";
import UpdateUserModal from '../../modals/UpdateUserModal/UpdateUserModal'
import DeleteAccountModal from '../../modals/DeleteConfirmModal/User/DeleteUserConfirmModal'
import UserCover from '../../images/resources/cover-network.jpeg'
import FeedIcon from '../../images/ic1.png'
import InfoIcon from '../../images/ic2.png'
import PortfolioIcon from '../../images/ic3.png'
import NotificationIcon from '../../images/review.png'


const MainUserProfil = () => {

    const userInformation = localStorage.getItem('user')
    const userDetails = JSON.parse(userInformation)
  
    const companyInformation = localStorage.getItem('company')
    const companyDetails = JSON.parse(companyInformation)

    const userId = userDetails._id
    
    const [ userInfo, setUserInfo ] = useState({
        overview : "",
        experience : ""
    }) 
    const [ userEducation, setUserEducation] = useState("")
    const [ userSkills, setUserSkills] = useState([])
    const [ userPortfolio, setUserPortfolio] = useState([])

    const [ feedToggle, setFeedToggle ] = useState(false)
    const [ infoToggle, setInfoToggle ] = useState(true)
    const [ portfolioToggle, setPortfolioeedToggle ] = useState(false)
    const [ notificationToggle, setNotificationToggle ] = useState(false)
    

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
        axios.get(`/user/${userId}`)
            .then(res => {

                let user = res.data.user
                const { education } = user

                if (education === undefined){
                    setUserEducation("")
                }
                const { overview, experience } = user.info
                const { skills } = user
                const { portfolio } = user

                 
                    setUserInfo(prevState => {
                        return {...prevState,overview,experience}
                    }) 
                    setUserEducation(education)
                    setUserSkills(skills)
                    setUserPortfolio([ portfolio]) 
            })
    },[])

    const showFeed = () => {
        setFeedToggle(true)
        setInfoToggle(false)
        setPortfolioeedToggle(false)
        setNotificationToggle(false)
        
    }
    const showInfo = () => {
        setFeedToggle(false)
        setInfoToggle(true)
        setPortfolioeedToggle(false)
        setNotificationToggle(false)
        
    }
    const showPortfolio = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(true)
        setNotificationToggle(false)
        
    }
    const showNotification = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(false)
        setNotificationToggle(true)
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
                                <UsersSocialMediaLinks 
                                        socialmedialink = { userDetails.companySocialmedialink } 
                                        picture = { userDetails.picture }
                                        country = { userDetails.country }
                                        email = { userDetails.email }
                                        phone = { userDetails.phone }
                                        address = { userDetails.address }
                                        _id = { userDetails._id}
                                />
                                <div className="col-lg-6">
                        <div className="main-ws-sec">

                            <div className="user-tab-sec rewivew">
                            <h3> { userDetails.company}</h3>
                                        <div className="star-descp">
                                            <span>Established : { userDetails.registered }</span>
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
                                        </ul>
                                    </div>
                                    </div>
                                { 
                                    infoToggle  ? <UserInfo 
                                                        overview={ userInfo.overview }
                                                        experiences = { userInfo.experience }
                                                        skills = { userSkills }
                                                        location = { userDetails.address }
                                                        country = { userDetails.country}
                                                        education = { userEducation}
                                                        /> : 
                                    feedToggle ? <UserFeed 
                                                    email = { userDetails.email }
                                                    companyDetails = { companyDetails }
                                                    userDetails = { userDetails}
                                                     /> : 
                                    portfolioToggle ? <UserPortfolio 
                                                        userPortfolio = {userPortfolio}
                                                    /> :
                                    notificationToggle ? <UserNotification /> : 
                                                    <UserFeed  
                                                        email = { userDetails.email }
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
                                    <UpdateUserModal
                                        showModal={showModal}
                                        closeModal={closeModal}
                                        userId = { userDetails._id}
                                        overview={ userInfo.overview }
                                        experiences = { userInfo.experience }
                                        skills = { userSkills }
                                        location = { userDetails.address }
                                        country = { userDetails.country}
                                        education = { userEducation}
                                        email = { userDetails.email } 
                                        socialmedialink = { userDetails.companySocialmedialink } 
                                        picture = { userDetails.picture }
                                        phone = { userDetails.phone }
                                        address = { userDetails.address }
                                        username = { userDetails.username}
                                        age = { userDetails.age}
                                        name = { userDetails.name}
                                        gender = { userDetails.gender}
                                        company = { userDetails.company}
                                        about = { userDetails.about}
                                        registered = { userDetails.registered}
                                        />
									</div>
                                    <UserPortfolio/>
                                    <div className="message-btn">
                                        <button className="btn btn-danger" onClick={openDeleteModal}>
                                            <i className="fa fa-trash"></i> Delete Account 
                                        </button>
                                        <DeleteAccountModal 
                                            showModal={showModalDelete}
                                            closeModal={closeModal}
                                            userId = { userDetails._id}
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
 
export default MainUserProfil;
