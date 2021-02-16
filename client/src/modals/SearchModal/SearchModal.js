import React, {  useState, useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios'
import './SearchModal.css'
import { Redirect } from "react-router-dom";

Modal.setAppElement("#root");

const SearchModal = props => {

    const { showModal,closeModal } = props

    const [ usersDetails, setUsersDetails ] = useState([
        {
            _id: "",
            name:"" ,
            company:"" ,
            email: "",
            phone: ""
        }
    ])
    const [ companiesDetails, setCompaniesDetails ] = useState([
        {
            _id : "",
            company : "",
            createdAt : "",
            phone : "",
            email : ""
        }
    ])
    const [ inputValue , setInputValue ] = useState("")
    const [ searchResult, setSearchResult ] = useState(["Congolese Network - 243 "])
    const [ redirectCompany, setRedirectCompany ] = useState(false)
    const [ company, setCompany ] = useState("")
    const [ redirectUser, setRedirectUser ] = useState(false)
    const [ user, setUser ] = useState("")

    useEffect(() => {
        axios.get('/company')
            .then(res => {
                const companiesList = res.data.company
                setCompaniesDetails(companiesList)
            })
    }, [])

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                const usersList = res.data.users
                setUsersDetails(usersList)
            })
    }, [])

       
    const companiesNames = companiesDetails.map(companyName => (companyName.company))
    const userNames = usersDetails.map(userName => (userName.name))
    const lists = [...companiesNames, ...userNames]

    const handleSearch = (event) => {
        
        event.preventDefault()
        setInputValue(event.target.value)

        const searchValue = inputValue.toLowerCase()
        const filteredCharacters = lists.filter(character => {
            return (
              character.toLowerCase().includes(searchValue) 
            );
          });
        setSearchResult(filteredCharacters)
        
    }
    const handleRemove = (item) => {
        const newList = searchResult.filter(element => element !== item)
        setSearchResult(newList)
    }
    const handleView = (item) => {

        const companyList = companiesDetails.filter(companyDetails => { 
            
            return companyDetails.company === item
        })

        const userList = usersDetails.filter(userDetails => {

            return userDetails.name === item
        })
        const user = userList[0]

        const company = companyList[0]

       

        if(user !== undefined){
            const userId = user._id
            setUser(userId)
            setRedirectUser(true)
            setRedirectCompany(false)
        }
         else if(company !== undefined){
            const companyId = company._id
            setCompany(companyId)
            setRedirectCompany(true)
            setRedirectUser(false)
       }
        
    }
    
    return (
    <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-wrapping">
        <div className="form-row justify-content-center">
            <div className="col-md-10">
                <div className="md-form form-group">
                    <input type="text" className="form-control"  value={inputValue} onChange={handleSearch} />  
                </div>
            </div>
        </div>
        {
            searchResult.length > 0 ? 
            <ul className="social_links">
                {
                    searchResult.map((item, index) => {
                    return  <li 
                                key={index} 
                                className="list-group-item d-flex justify-content-between align-items-center" 
                                onClick={() => handleView(item)}>
                                    
                                    <i className="la la-user"></i> 
                                        { item } 
                                    <i className="fa fa-close" onClick={() => handleRemove(item)}></i> 
                            </li>
                    })
                }  
            </ul>
             : <h6>No result </h6>
        }
        {
            redirectCompany ? <Redirect to={`/companies/${company}`}/> : redirectUser ? <Redirect to={`/users/${user}`}/> : null
        }
        
    </Modal>
  );
};

export default SearchModal;
