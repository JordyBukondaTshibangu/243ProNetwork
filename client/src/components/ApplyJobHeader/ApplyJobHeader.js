import React from 'react'

function ApplyJobHeader(props) {

    const { applicants, jobType, salary, views, date } = props

    return (
        <div className="bids-detail">    
            <div className="row">
                <div className="col-12 appliedjob">
                    <ul>
                        <li>
                            <h3>Applicants</h3>
                            <br/>
                            <p>{ applicants }</p>
                        </li>
                        <li>
                            <h3>Job Type</h3>
                            <br/>
                            <p>{ jobType }</p>
                        </li>
                        <li>
                            <h3>Salary</h3>
                            <br/>
                            <p>R { salary } </p>
                        </li>
                        <li>
                            <h3>Views</h3>
                            <br/>
                            <p>{ views }</p>
                        </li>
                    </ul>
                    <div className="bids-time">
                        <h3>Posted : { date }</h3>
                            <br/>
                            <p>Open</p> 
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ApplyJobHeader
