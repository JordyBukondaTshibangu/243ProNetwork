import React from 'react'
import ImageProfil from '../../images/resources/user-pic.png'
import './UserProfiction.css'
import { Link } from 'react-router-dom'


const UserProfiction = () => {

    const companyInformation = localStorage.getItem('company')
    const companyDetails = JSON.parse(companyInformation)

    const userInformation = localStorage.getItem('user')
    const userDetails = JSON.parse(userInformation)

    const { name, company, email, registered , picture } = userDetails
    const { company_name, company_email, company_registered , company_picture} = companyDetails
    

    const user_profil = `/${picture}`
    const company_profil = `/${company_picture}`
    
    const style = {
        color: "#17a2b8"
    }
    const userProfiction = (
        <div className="user-data full-width">
            <div className="user-profile">
                <div className="username-dt">
                    <div className="usr-pic">
                        {
                           picture === "" ? <img src={ImageProfil} alt="myprofil"/> :  <img src={user_profil} alt="myprofil"/>
                        }
                    </div>
                </div>
                <div className="user-specs">
                    <h5>{name}</h5>
                    <small>{ company} </small>
                </div>
            </div>
            <ul className="user-fw-status">
                <li>
                    <h6>Email</h6>
                    <br></br>
                    <small><i>{email}</i></small>
                </li>
                <li>
                    <h6>registered</h6>
                    <br></br>
                    <small><i>{registered}</i></small>
                </li>
                <li>
                    <Link to="/my-profile" style={style}>View Profile</Link>
                </li>
            </ul>
        </div>
    )


    const companyProfiction = (
        <div className="user-data full-width">
                <div className="user-profile">
                <div className="username-dt">
                    <div className="usr-pic">
                        {
                           company_picture === "" ? 
                                    <img src={ImageProfil} alt=""/> : 
                                    <img src={company_profil} 
                                            alt=""
                                            width="70%" 
                                            height="70%" style={{ margin : 'auto', marginBottom : '8%'}}
                                    />
                        }
                    </div>
                </div>
                <div className="user-specs">
                    <h5>{name}</h5>
                    <small>{ company_name} </small>
                </div>
             </div>
            <ul className="user-fw-status">
                <li>
                    <h6>Email</h6>
                    <br></br>
                    <small><i>{company_email}</i></small>
                </li>
                <li>
                    <h6>registered</h6>
                    <br></br>
                    <small><i>{company_registered}</i></small>
                </li>
                <li>
                    <Link to="/company-profil" style={style}>View Profile</Link>
                </li>
            </ul>
        </div>
    )
    
    if(email === ""){
        return companyProfiction
    }else {
        return userProfiction
    }

}
 
export default UserProfiction ;
