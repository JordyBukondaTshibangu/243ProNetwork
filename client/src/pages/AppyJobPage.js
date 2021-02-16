import React from 'react'
import Header from '../container/Header/Header'
import MainApplyJob from '../container/MainApplyJob/MainApplyJob'
import Footer from '../container/Footer/Footer'

const AppyJob = props => {

    const jobId = props.match.params.jobId
    return ( 
        <div>
            <Header/>
            <MainApplyJob jobId={jobId} {...props}/>
            <Footer/>
        </div>
     );
}
 
export default AppyJob ;


