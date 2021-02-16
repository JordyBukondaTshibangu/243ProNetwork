import React, {  useState } from "react";
import Modal from "react-modal";
import DatePicker from 'react-date-picker';
import axios from 'axios'
import "./UpdateCompany.css"
import OnSuccessMessage from '../../feedback/UpdateMessage/UpdateMessage'
import OnFailureMessage from '../../feedback/FailureMeesage/FailureMeesage'

Modal.setAppElement("#root");

const UpdateUserModal = props => {

    const { showModal,closeModal, companyId, overview   ,country ,awards, email   ,phone ,
                address ,
                company,
                about,
                total_number_employee
                 } = props

    const [ company_name, setCompanyName ] = useState(company) 
    const [ company_country, setCompanyCountry ] = useState(country) 
    const [ company_createdAt, setCompanyCreated ] = useState("") 
    const [ company_email, setCompanyEmail ] = useState(email) 
    const [ company_phone, setCompanyPhone ] = useState(phone) 
    const [ company_address, setCompanyAddress ] = useState(address) 
    const [ company_about, setCompanyAbout ] = useState(about) 
    const [ company_totalNumberEmployee, setCompany_totalNumberEmployee ] = useState(total_number_employee) 
        
    const [ company_overview, setCompanyOverview ] = useState(overview) 
    const [ company_award, setCompanyAwards] = useState(awards) 

    const [ onSuccess, setOnSuccess] = useState(false)
    const [ onFailure, setOnFailure] = useState(false)
    

    const handleSubmit = async(event) => {
        event.preventDefault()

        const updatedCompany =  {
            company : company_name, 
            country : company_country,
            createdAt : company_createdAt,
            email : company_email,
            phone: company_phone,
            address: company_address,
            about:  company_about,
            total_number_employee : company_totalNumberEmployee,
            info: {
                overview : company_overview,
            }
          }

        try {

                await axios.patch(`/company/${companyId}`, updatedCompany)
                setOnSuccess(true)
                setTimeout(() => setOnSuccess(false), 15000)

                const res = await axios.get(`/company/${companyId}`)

                const existingCompany = res.data.company

                const {  _id, company,password,picture, country , createdAt, email, phone, address, about,registered, total_number_employee } = existingCompany

                const companyLocalStorage ={
                    company_id : _id, 
                    password,createdAt ,
                    company_name:  company,
                    company_picture: picture, 
                    company_country:  country , 
                    company_email :  email,
                    company_phone :  phone,
                    company_address :  address, 
                    company_about:  about,
                    total_number_employee : total_number_employee,
                    company_registered :  registered
                }

                localStorage.setItem('company', JSON.stringify(companyLocalStorage))

        }catch(error){
            setOnFailure(true)
            setTimeout(() => setOnFailure(false), 15000)
        }
        
    }

    const style = {
        color: "#fff",
        backgroundColor: "#17a2b8",
        borderColor: "#17a2b8"
      }

    return (
    <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapper">
        <div className="post-project">
            <h3>Update my Profil </h3>
            <div className="post-project-fields">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <input type="email" className="form-control"  value={company_email}  onChange={(event) => setCompanyEmail(event.target.value)} placeholder="email"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <input type="text" className="form-control" value={company_name}  onChange={(event) => setCompanyName(event.target.value)} placeholder="company name"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                    <DatePicker
                                        onChange={(date) => setCompanyCreated(date)}
                                        value={company_createdAt}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <input type="text" className="form-control" value={company_country} onChange={(event) => setCompanyCountry(event.target.value)} placeholder="Country"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="md-form form-group">
                                <input type="text" className="form-control" value={company_address}  onChange={(event) => setCompanyAddress(event.target.value)} placeholder="Address"/>
                            </div>
                        </div>        
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <input type="text" className="form-control" value={company_totalNumberEmployee} onChange={(event) => setCompany_totalNumberEmployee(event.target.value)} placeholder="Total number of employee"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <input type="text" className="form-control" value={company_phone} onChange={(event) => setCompanyPhone(event.target.value)} placeholder="Phone"/>
                            </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <textarea lass="form-control" value={company_about} onChange={(event) => setCompanyAbout(event.target.value)} placeholder="about"></textarea>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="md-form form-group">
                                <textarea lass="form-control" value={company_overview} onChange={(event) => setCompanyOverview(event.target.value)} placeholder="overview"></textarea>
                            </div>
                        </div>  
                        <div className="col-md-12">
                            <div className="md-form form-group">
                                <textarea lass="form-control" value={company_award}  onChange={(event) => setCompanyAwards(event.target.value)} placeholder="Award"></textarea>
                            </div>
                        </div>        
                    </div>
                    <div className="col-lg-12">
                        { 
                            onSuccess ? <OnSuccessMessage message = "Your Information were Updated" /> : null
                        }
                        {
                            onFailure ? <OnFailureMessage message = "Oupss, something went wrong" /> : null 
                        }
                    </div>
                    <div className="col-lg-6">
                        <ul>
                            <li> <button style={style} type="submit">  <i className="fa fa-pencil"></i> Edit User</button></li>
                            {
                                onSuccess ?  <li><button className= "btn btn-primary danger" onClick={closeModal}>Close</button></li> : 
                                            <li><button className= "btn btn-primary danger" onClick={closeModal}>Cancel</button></li>
                            }
                        </ul>
                    </div>
                </form>
        </div>
        <a href="/" title="">
          <i className="la la-times-circle-o"></i>
        </a>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
