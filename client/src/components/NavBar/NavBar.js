import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../../images/icon1.png'
import CompanyIcon from '../../images/icon2.png'
import UserIcon from '../../images/icon4.png'
import JobIcon from '../../images/icon5.png'
import NotificationIcon from '../../images/icon7.png'
import UserAccount from '../UserAccount/UserAccount'

const  NavBar = ({ toggleNavbar}) => {

    const userInformation = localStorage.getItem('user')
    const userDetails = JSON.parse(userInformation)

    const { email} = userDetails

    return ( 
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">   
                            <span><img src={HomeIcon} alt="homeIcon"/></span>  Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/companies">
                            <span><img src={CompanyIcon} alt="companyIcon" /></span> Companies
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
                                <span><img src={NotificationIcon} alt="NotifictaionIcon"/></span> Notification
                            </Link> : null
                       }
                    </li>
                </ul>
            </nav>
            <div className="menu-btn">
                    <i className="fa fa-bars" onClick={toggleNavbar}></i>
            </div>
            <div>
                <UserAccount/>
            </div>
        </div>

     );
}
 
export default NavBar;