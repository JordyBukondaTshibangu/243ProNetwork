import React from 'react'
import Icon from '../../images/resources/cmp-icon1.png'
import { Link } from 'react-router-dom';


const SingleUser = ({ usersDetails }) => {
    return ( 
        <div className="companies-list">
        <div className="row">
           {
               usersDetails.map(usersDetail => {

                   const {  _id, name, company, email, phone, picture } = usersDetail
                   const user_profile = `/${picture}`
                   const user_id = _id
                   return (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={_id}>
                                    <div className="company_profile_info">
                                        <div className="company-up-info">
                                            {
                                                user_profile === "" || user_profile === undefined ? <img src={Icon} alt=""/> :  <img src={user_profile} alt=""/>
                                            }
                                            <h3>{name}</h3>
                                                <h4>Company { company }</h4>
                                                <h4>Phone { phone }</h4>
                                                <h4>Email { email }</h4>
                                            <ul>
                                                <li><a href="/" title="" className="message-us"><i className="fa fa-envelope"></i></a></li>
                                            </ul>
                                        </div>
                                            <Link to={`users/${user_id}`} className="view-more-pro"> View Profile </Link>
                                    </div>
                            </div>
                   )
               })
           }
        </div>
    </div>
     );
}
 
export default SingleUser;
