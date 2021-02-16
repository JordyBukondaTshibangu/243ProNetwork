import React from 'react'
import Header from '../container/Header/Header'
import MainJobs from '../container/MainJobs/MainJobs'
import Footer from '../container/Footer/Footer'

const Jobs = props => {
    return ( 
        <div>
            <Header/>
            <MainJobs {...props}/>
            <Footer/>
        </div>
     );
}
 
export default Jobs;

