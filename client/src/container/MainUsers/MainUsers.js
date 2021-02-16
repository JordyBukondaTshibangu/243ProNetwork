import React, { useState, useEffect } from 'react'
import SingleUser from '../../components/SingleUser/SingleUser'
import LoadingSpinner from '../../feedback/LoadingSpinner/LoadingSpinner'
import axios from 'axios'

const MainCompaniesAndJobs = () => {

    const [ usersDetails, setUsersDetails ] = useState([
        {
            _id: "",
            name:"" ,
            company:"" ,
            email: "",
            phone: "",
            picture : ""
        }
    ])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                const usersList = res.data.users
                localStorage.setItem('users', JSON.stringify(usersList))
                setUsersDetails(usersList)
                setLoading(false)
            })
    }, [])

    return ( 
        <section className="companies-info">
            <div className="container">
               {  loading ? <LoadingSpinner /> : <SingleUser usersDetails={usersDetails}/>}
            </div>
        </section>
     );
}
 
export default MainCompaniesAndJobs ;
