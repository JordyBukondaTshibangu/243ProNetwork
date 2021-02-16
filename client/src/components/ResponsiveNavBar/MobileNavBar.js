import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import HomeIcon from '../../images/icon1.png'
import CompanyIcon from '../../images/icon2.png'
import UserIcon from '../../images/icon4.png'
import JobIcon from '../../images/icon5.png'
import NotificationIcon from '../../images/icon7.png'


const NAV_BAR_STYLE = {
    nav : {
        background : '#17a2b8',
        width : '20%',
        height : '100vh',
        position : 'fixed',
        top: 0,
        left : 0,
        zIndex : 1000

    },

    overlay : {
        background : 'rgb(0,0,0,.8)',
        width : '100%',
        height : '100%',
        position : 'fixed',
        top: 0,
        left : 0,
        bottom : 0,
        rigth : 0,
        zIndex : 1000
    }
}

const MobileNavBar = ({toggleNavbar}) => {

    const userInformation = localStorage.getItem('user')
    const userDetails = JSON.parse(userInformation)
    const { email} = userDetails


    return ReactDOM.createPortal(
        <>
        <div style={NAV_BAR_STYLE.overlay} onClick={toggleNavbar}/>
        <div style={NAV_BAR_STYLE.nav} onClick={toggleNavbar}> 
        <nav>
                <ul>
                    <li>
                        <Link to="/home">   
                            <span><img src={HomeIcon} alt="homeIcon"/></span>  Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/companies">
                            <span><img src={CompanyIcon} alt="companyIcon" /></span> Comp
                        </Link>
                    </li>
                    <li>
                        <Link to="/users">
                            <span><img src={UserIcon} alt="UserIcon" /></span> Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/jobs">
                            <span><img src={JobIcon} alt="homeIcon" /></span>  Jobs
                        </Link>
                    </li>
                    <li>
                       {
                           email !== "" ? 
                           <Link to="/my-profile" className="">
                                <span><img src={NotificationIcon} alt="NotifictaionIcon"/></span> Notif
                            </Link> : null
                       }
                    </li>
                </ul>
            </nav>
        </div>
        </>, document.getElementById('portal-root')
    )
}

export default MobileNavBar
