import React from 'react'

const UploadedBar = ({percentage}) => {
    return(
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-danger" 
                role="progressbar" 
                style={{width : `${percentage}%`}}>
                    { percentage}%
            </div>
      </div>
    )
}

export default  UploadedBar