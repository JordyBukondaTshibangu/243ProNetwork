import React from 'react'
import Icon from '../../images/resources/cmp-icon1.png'
import { Link } from 'react-router-dom';

const  SingleCompany = ({companiesDetails}) => {
    
    
    return ( 
        <div className="companies-list">
            <div className="row">
               {
                   companiesDetails.map(companyDetails => {
                       const { _id, company, phone, email, picture  } = companyDetails
                       const company_profile = `/${picture}`
                       const company_id = _id
                       return (
                                <div className="col-lg-3 col-md-4 col-sm-6" key={_id}>
                                        <div className="company_profile_info">
                                            <div className="company-up-info">
                                            {
                                                company_profile === "" || company_profile === undefined ? <img src={Icon} alt=""/> :  <img src={company_profile} alt=""/>
                                            }
                                                <h3>{company}</h3>
                                                    <h4>Phone { phone }</h4>
                                                    <h4>Email { email }</h4>
                                                <ul>
                                                    <li><a href="/" title="" className="message-us"><i className="fa fa-envelope"></i></a></li>
                                                </ul>
                                            </div>
                                                <Link to={`companies/${company_id}`} className="view-more-pro"> View Profile </Link>
                                        </div>
                                </div>
                       )
                   })
               }
            </div>
        </div>
     );
}
 
export default SingleCompany;
