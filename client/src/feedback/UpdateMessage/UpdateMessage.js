import React from 'react'

const UpdateMessage = props => {
    return (
        <div className="alert alert-info" role="alert">
            {props.message}
        </div>
        
    )
}

export default UpdateMessage