import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserSocialMediaLink from '../../components/AnyUserSocialMediaLink/AnyUserSocialMediaLink'
import UserFeed from '../../components/AnyUserFeed/AnyUserFeed'
import UserInfo from '../../components/AnyUserInfo/AnyUserInfo'
import UserPortfolio from '../../components/AnyUserPortfolio/AnyUserPortfolio'
import UserCover from '../../images/resources/cover-img.jpg'
import FeedIcon from '../../images/ic1.png'
import InfoIcon from '../../images/ic2.png'
import PortfolioIcon from '../../images/ic3.png'
import SendEmailModal from '../../modals/SendEmailModal/SendEmailModal'


const MainAnyUser = props => {

    const userId = props.match.params.userId

    const [ userDetails, setUserDetails ] = useState({
        _id : "",
        picture : "",
        country : "",
        age : 0,
        name : "",
        gender : "",
        company : "",
        email : "",
        phone : "",
        address : "",
        about : "",
        registered : ""
    })
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

    const [showModal, setShowModal] = useState(false)
    
    const openModal = () => {
      setShowModal(true)
    }

    const closeModal = () => {
      setShowModal(false)
    }

    useEffect(() => {
        axios.get(`/user/${userId}`)
            .then(res => {

                let user = res.data.user
                const {  _id,picture, country , age ,name,gender, company,email,phone,address, about,registered,education } = user
                const { overview, experience } = user.info
                const { skills } = user
                const { portfolio } = user

                    setUserDetails(prevState => {
                        return { ...prevState, _id, picture, country , age ,name,gender, company,email,phone,address, about, registered }
                    })
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
    }
    const showInfo = () => {
        setFeedToggle(false)
        setInfoToggle(true)
        setPortfolioeedToggle(false)
    }
    const showPortfolio = () => {
        setFeedToggle(false)
        setInfoToggle(false)
        setPortfolioeedToggle(true)
    }
    
    return (
        <React.Fragment>
            <section className="cover-sec">
                <img src={UserCover} alt=""/>
                <div className="add-pic-box">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-lg-12 col-sm-12">								
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    
            <main>
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">
                                <UserSocialMediaLink 
                                        socialmedialink = { userDetails.companySocialmedialink } 
                                        picture = { userDetails.picture }
                                        country = { userDetails.country }
                                        email = { userDetails.email }
                                        phone = { userDetails.phone }
                                        address = { userDetails.address }
                                />
    
                            <div className="col-lg-7">
                            <div className="main-ws-sec">
    
                                <div className="user-tab-sec rewivew">
                                        <h3> { userDetails.company}</h3>
                                        <div className="star-descp">
                                            <span>Established : { userDetails.registered }</span>
                                        </div>
                                        
                                        <div className="tab-feed st2 settingjb">
                                            <ul>
                                            <li data-tab="info-dd" onClick={showInfo}>
                                                <img src={InfoIcon} alt="" />
                                                <span>Info</span>
                                            </li>

                                            <li data-tab="feed-dd"  onClick={showFeed}>
                                                <img src={FeedIcon} alt="" />
                                                <span>Feed</span>
                                            </li>
                                            <li data-tab="portfolio-dd" onClick={showPortfolio}>
                                                <img src={PortfolioIcon} alt="" />
                                                <span>Portfolio</span>
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
                                                    userDetails = { props.userDetails } 
                                                    companyDetails = { props.companyDetails }
                                                /> : 
                                    portfolioToggle ? <UserPortfolio userPortfolio={userPortfolio}/> :
                                                <UserFeed  
                                                    email = { userDetails.email }
                                                    userDetails = { props.userDetails } 
                                                    companyDetails = { props.companyDetails }
                                                    />
                                }
                                
                                </div>
                                </div>
                                <div className="col-lg-2">
								<div className="right-sidebar">
									<div className="message-btn">
                                        <button className="btn btn-info" onClick={openModal}>
                                            <i className="fa fa-envelope"></i> Send Email 
                                        </button>
                                        <SendEmailModal
                                                closeModal={closeModal}
                                                showModal = { showModal}
                                                senderEmail = { "jordytshibss@gmail.com"}
                                                recipientEmail = { userDetails.email}
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
    )
}
 
export default MainAnyUser;
