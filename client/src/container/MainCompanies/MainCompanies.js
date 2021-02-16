import React, { useState, useEffect } from 'react'
import SingleCompany from '../../components/SingleCompany/SingleCompany'
import LoadingSpinner from '../../feedback/LoadingSpinner/LoadingSpinner'
import axios from 'axios'

const MainCompaniesAndJobs = () => {

    const [ companiesDetails, setCompaniesDetails ] = useState([
        {
            _id : "",
            company : "",
            createdAt : "",
            phone : "",
            email : "",
            picture : ""
        }
    ])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        axios.get('/company')
            .then(res => {
                const companiesList = res.data.company
                setCompaniesDetails(companiesList)
                setLoading(false)
            })
    }, [])


    return ( 
        <section className="companies-info">
            <div className="container">
                { loading ? <LoadingSpinner /> : <SingleCompany companiesDetails={companiesDetails}/>}
            </div>
        </section>
     );
}
 
export default MainCompaniesAndJobs ;
