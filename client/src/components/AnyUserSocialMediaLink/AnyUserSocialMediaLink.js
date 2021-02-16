import React from 'react'
import UserIcon from '../../images/resources/user.png'

const UserSocialMediaLink = props => {
    const {  picture , country , email, phone, address } = props

    const user_profil = `h/${picture}`

    return ( 
        <div className="col-lg-3">
								
        <div className="main-left-sidebar">
            
            <div className="user_profile">
                
                <div className="user-pro-img">
                  {  
                     user_profil === "" ? 
                     <img src={UserIcon} alt={picture}/> : 
                     <img src={user_profil} alt={picture}/>
             }
                   
                </div>
                <div className="user_pro_status">
                    <ul className="social_links" >
                        <li>
                            <h4> <b>Email : </b> {email}</h4>  
                        </li>
                        <li>
                           <h4> <b>Country :</b> {country} </h4> 
                        </li>
                        <li>
                            <h4> <b>Phone :</b> {phone} </h4> 
                        </li>
                        <li>
                            <h4> <b>Address :</b> {address}</h4> 
                        </li>
                    </ul>
                </div>
                <ul className="social_links">
                        <li><a href="https://www.facebook.com/243pronetwork/" title=""><i className="fa fa-facebook-square"></i> https://www.facebook.com/243pronetwork/</a></li>
                        <li><a href=" https://twitter.com/243_pro_network" title=""><i className="fa fa-twitter"></i> https://twitter.com/243_pro_network</a></li>
                        <li><a href="https://www.linkedin.com/company/243pronetwork/" title=""><i className="fa fa-linkedin"></i> https://www.linkedin.com/company/243pronetwork/</a></li>
                        <li><a href="https://www.instagram.com/243_pro_network/" title=""><i className="fa fa-instagram"></i> https://www.instagram.com/243_pro_network/</a></li>
                        <li><a href=" https://www.youtube.com/channel/UChvASvzvS8N-UkLoA7WVO5g" title=""><i className="fa fa-youtube"></i> https://www.youtube.com/channel/UChvASvzvS8N-UkLoA7WVO5g</a></li>
                </ul>
            </div>
        </div>
    </div>
     );
}
 
export default UserSocialMediaLink;